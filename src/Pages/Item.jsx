import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Item = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currmode = useSelector((state) => state.mode);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(false);
  const [inStock] = useState(true);
  const [reviews] = useState([
    { name: "Alice", rating: 5, comment: "Great product!" },
    { name: "Bob", rating: 4, comment: "Very good, but could be improved." },
  ]);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSnackbarOpen = (msg) => {
    setOpen(true);
    setMessage(msg);
  };

  useEffect(() => {
    axios
      .get("https://mern-project-backend-green.vercel.app/api/users/data")
      .then((res) => {
        const itemData = res.data.find((d) => d.product_name === id);
        if (itemData) {
          setData({ ...itemData, email: localStorage.getItem("user") });
        }
        setLoading(false);
      })
      .catch(() => {
        console.log("error fetching data");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (data) {
      axios
        .post(
          "https://mern-project-backend-green.vercel.app/api/users/itemexists",
          {
            email: data.email,
            product_name: data.product_name,
          }
        )
        .then(() => {
          setCart(true);
        })
        .catch(() => {
          setCart(false);
        });
    }
  }, [data]);

  const handleQtyChange = (event) => {
    const newQty = event.target.value;
    console.log(`Quantity of ${data.product_name} changed to ${newQty}`);
    data.qty = parseInt(newQty);
    axios.put("https://mern-project-backend-green.vercel.app/api/users/qty", {
      email: data.email,
      product_name: data.product_name,
      qty: data.qty,
    });
  };

  const handleAddToCart = () => {
    axios
      .post(
        "https://mern-project-backend-green.vercel.app/api/users/addcart",
        data
      )
      .then(() => {
        setCart(true);
        handleSnackbarOpen("Added to Cart");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteCart = () => {
    axios
      .delete(
        "https://mern-project-backend-green.vercel.app/api/users/deletecart",
        {
          data: {
            email: localStorage.getItem("user"),
            product_name: data.product_name,
          },
        }
      )
      .then(() => {
        setCart(false);
        handleSnackbarOpen("Removed from Cart");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loading) {
    return (
      <div
        className={`p-6 min-h-screen ${
          currmode ? "bg-gray-700 text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex justify-center items-center h-full">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
          <span className="ml-2">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Grid
      container
      className={`p-6 ${
        currmode ? "bg-gray-700 text-white" : "bg-white text-black"
      }`}
      spacing={2}
    >
      <Grid item xs={12} md={6}>
        <img
          className="w-70 h-70 object-cover rounded mx-8"
          src={data.image_link}
          alt={data.product_name}
        />
      </Grid>
      <Grid item xs={12} md={6} className="md:pl-6">
        <Typography variant="h4" className="mb-4">
          {data.product_name}
        </Typography>
        <Typography variant="h5" className="text-gray-700 mb-4">
          {data.price}
        </Typography>
        <Typography
          variant="body1"
          className={`mb-4 ${currmode ? "text-yellow-400" : "text-yellow-500"}`}
        >
          Rating: {data.rating} / 5
        </Typography>
        <Typography variant="body1" className="mb-6">
          Features:
        </Typography>
        <ul className="list-disc list-inside mb-6">
          {data.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <div className="mb-6">
          {inStock ? (
            <span className="text-green-500">In Stock</span>
          ) : (
            <span className="text-red-500">Out of Stock</span>
          )}
        </div>
        <div className="flex gap-4 mb-6 items-center">
          <Button
            variant="contained"
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${
              currmode ? "hover:bg-blue-600" : "hover:bg-blue-700"
            }`}
            onClick={() => {
              cart ? handleDeleteCart() : handleAddToCart();
            }}
          >
            {cart ? "Delete from Cart" : "Add to Cart"}
          </Button>
          <Button
            variant="contained"
            className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition ${
              currmode ? "hover:bg-green-600" : "hover:bg-green-700"
            }`}
            onClick={() => {
              handleAddToCart();
              navigate("/checkout");
            }}
          >
            Buy Now
          </Button>
          <FormControl variant="outlined" className="w-24">
            <InputLabel>Qty</InputLabel>
            <Select
              value={data.qty}
              onChange={handleQtyChange}
              label="Qty"
              className={`${
                currmode ? "text-white" : "text-black"
              } bg-white rounded`}
            >
              {[...Array(10).keys()].map((i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          className={`mb-4 ${currmode ? "text-white" : "text-black"}`}
        >
          Customer Reviews
        </Typography>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={index}
              className={`mb-4 p-4 border rounded ${
                currmode ? "border-gray-600" : "border-gray-300"
              }`}
            >
              <Typography variant="h6">{review.name}</Typography>
              <Typography
                variant="body1"
                className={`text-yellow-500 ${
                  currmode ? "text-yellow-400" : "text-yellow-500"
                }`}
              >
                Rating: {review.rating} / 5
              </Typography>
              <Typography variant="body1">{review.comment}</Typography>
            </div>
          ))
        ) : (
          <Typography variant="body1">No reviews yet.</Typography>
        )}
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Added to Cart
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
};

export default Item;
