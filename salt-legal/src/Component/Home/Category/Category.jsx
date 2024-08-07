


import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import "./Category.css";

function Category() {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  
const firebaseConfig = {
  apiKey: "AIzaSyBWb1c2C84qfAIjJ0-9XpQ-Pq-mP3qgYqA",
  authDomain: "first-project-796d7.firebaseapp.com",
  databaseURL: "https://first-project-796d7-default-rtdb.firebaseio.com",
  projectId: "first-project-796d7",
  storageBucket: "the-salt-legal.appspot.com",
  messagingSenderId: "50410309387",
  appId: "1:50410309387:web:e7c7ed65c6ab7acd07040e",
  measurementId: "G-2HW6S010DY"
};

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  useEffect(() => {
      fetchUploadedImages();
  }, []);

  const fetchUploadedImages = async () => {
      try {
          const imagesRef = ref(storage, 'Category'); 
          const imagesList = await listAll(imagesRef);
          const urls = await Promise.all(imagesList.items.map(async (imageRef) => {
              const url = await getDownloadURL(imageRef);
              return url;
          }));
          setImageUrls(urls);
      } catch (error) {
          console.error('Error fetching uploaded images:', error);
      }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://the-salt-legal-backend.onrender.com/get/category');
        if (response.ok) {
          const data = await response.json();
          setCategoryData(data.data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="category-container">
      <div>
        <h2 className="container1">
          Reimagining Your <span>  Business Management </span> with <span> Comprehensive </span> Templates
        </h2>
        <p>5,000+ Templates | 10+ Business Departments</p>
      </div>

      <div className="category-container">
        {categoryData.slice(0, 8).map((item, index) => (
          <Card key={index} className="card-style" onClick={() => navigate('/templates')}>
            <CardContent>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <CardMedia>
                  <img src={imageUrls[index]} style={{ width: "100px" }} alt={item.title} />
                </CardMedia>
                <div className="card-style-1">
                  <Typography variant="h6" component="h2" className="card-style-2" style={{ textAlign: "center" }}>
                    {item.title}
                  </Typography>
                  <hr style={{ backgroundColor: "gray", height: "2px", width: "180px" }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Category;
