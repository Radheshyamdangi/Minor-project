const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        next(new ExpressError(errMsg, 400));
    } else {
        next();
    }
};

// Index route
router.get("/", wrapAsync(async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));


// New route
router.get("/new", (req, res) => {
    // if(!req.isAuthenticated()){
    //     req.flash("error","you must be a logged in  created Listing  ");
    //      return res.redirect("/login");
    // }
    res.render("listings/new.ejs");
});
   
// Show route
router.get("/:id", wrapAsync(async (req, res) => {
   
    let listing = await Listing.findById(req.params.id).populate("reviews");
    if(!listing){
        req.flash("error","Your requesting Listing does'not exits!");
        res.redirect("/listings");
    }
        res.render("listings/show.ejs", { listing });
    
    }));
    
    // Create Route
    router.post("/", validateListing, wrapAsync(async (req, res, next) => {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        req.flash("success","New Listing Created !");
        res.redirect("/listings");
    }));

    // Edit route
    router.get("/:id/edit", wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if(!listing){
            req.flash("error","Your requesting Listing does'not exits!");
            res.redirect("/listings");
        }
    res.render("listings/edit.ejs", { listing });
}));

// Update route
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    
    req.flash("success"," Listing Updated !");
    res.redirect(`/listings/${id}`);
}));

// Delete route
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," Listing Deleted !");
    res.redirect("/listings");
}));

module.exports = router;