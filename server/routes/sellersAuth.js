const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const sellersModel = require("../models/sellers");
const settingsModel = require("../models/settings");
const menusModel = require("../models/menus");
const verifyToken = require("../middleware/auth")
const upload = require("../middleware/multer")

router.post("/signup", upload.fields([
    { name: "cnicFront", maxCount: 1 },
    { name: "cnicBack", maxCount: 1 }
]), async (req, res) => {
    try {
        const state = req.body;
        const { fullname, username, email, password, address, phoneNumber, whatsappNumber, cnic, brandName } = state

        if (!fullname || !username || !email || !password || !address || !phoneNumber || !whatsappNumber || !cnic || !brandName) {
            return res.status(400).json({ message: "All fields are required!" })
        }

        if (!req.files?.cnicFront || !req.files?.cnicBack) {
            return res.status(400).json({ message: "CNIC front and back images are required!" });
        }

        const existingUser = await sellersModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists!" });
        }

        const userID = uuidv4().replace(/-/g, "").slice(0, 8);
        const hashedPassword = await bcrypt.hash(password, 10);

        const slugify = (str) => str.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
        const brandSlug = slugify(brandName);

        const existingBrand = await sellersModel.findOne({ $or: [{ brandName }, { brandSlug }] });
        if (existingBrand) {
            return res.status(400).json({ message: "This brand name is already taken!" });
        }

        const newSeller = {
            ...state,
            userID,
            password: hashedPassword,
            brandSlug,
            cnicFront: req.files?.cnicFront ? `/uploads/${req.files.cnicFront[0].filename}` : null,
            cnicBack: req.files?.cnicBack ? `/uploads/${req.files.cnicBack[0].filename}` : null,
        }

        const seller = await sellersModel.create(newSeller)

        await settingsModel.create({
            sellerID: seller._id,
            brandName: seller.brandName,
            brandSlug: seller.brandSlug,
        });

        await menusModel.insertMany([
            {
                sellerID: seller._id,
                name: "Main Menu",
                links: [
                    { label: "Products", url: "/" },
                    { label: "Contact Us", url: "/" },
                    { label: "About Us", url: "/" },
                ]
            },
            {
                sellerID: seller._id,
                name: "Footer Menu 1",
                links: [
                    { label: "Products", url: "/" },
                    { label: "Coupons", url: "/" },
                ]
            },
            {
                sellerID: seller._id,
                name: "Footer Menu 2",
                links: [
                    { label: "Terms & Conditions", url: "/" },
                    { label: "Privacy Policies", url: "/" },
                    { label: "About Us", url: "/" },
                    { label: "Contact Us", url: "/" },
                ]
            }
        ]);

        res.status(201).json({ message: "Form submitted successfully!" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Something went wrong while creating account." });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await sellersModel.findOne({ username })
        if (!user) {
            return res.status(404).json({ message: 'Invalid username or password!' })
        }

        const matchedPassword = await bcrypt.compare(password, user.password)

        if (matchedPassword) {
            const { userID } = user
            const token = jwt.sign({ userID }, "secret-key", { expiresIn: '30d' })

            res.status(200).json({ message: 'User logged in successfully!', token, user })
        }
        else {
            res.status(401).json({ message: 'Invalid username or password!' })
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message })
    }
});

router.get("/user", verifyToken, async (req, res) => {
    try {
        const userID = req.userID
        const user = await sellersModel.findOne({ userID })

        if (!user) {
            return res.status(404).json({ message: 'User not found!' })
        }

        res.status(200).json({ message: 'User found', user })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message })
    }
});

module.exports = router