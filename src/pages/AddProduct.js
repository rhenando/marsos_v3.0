import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { db, storage } from "../firebase.config";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../context/AuthContext";

const AddProduct = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const fetchUsername = async () => {
      if (currentUser) {
        if (currentUser.displayName) {
          setUsername(currentUser.displayName);
        } else {
          try {
            const userRef = doc(db, "users", currentUser.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUsername(userData.name || "User");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      }
    };
    fetchUsername();
  }, [currentUser]);

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [colorVariations, setColorVariations] = useState([
    { color: "", price: "" },
  ]);
  const [sizeVariations, setSizeVariations] = useState([
    { size: "", price: "" },
  ]);
  const [typeVariations, setTypeVariations] = useState([
    { type: "", price: "" },
  ]);
  const [priceRanges, setPriceRanges] = useState([
    { minQty: "", maxQty: "", price: "" },
  ]);
  const [dimensions, setDimensions] = useState({
    height: { value: "", unit: "cm" },
    width: { value: "", unit: "cm" },
    length: { value: "", unit: "cm" },
    weight: { value: "", unit: "kg" },
  });
  const [specialInputs, setSpecialInputs] = useState([
    { type: "", opcPrice: "", cementContent: "" },
  ]);
  const [mainImage, setMainImage] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);

  const customCategories = [
    "Construction",
    "Plastic & Papers",
    "Equipment",
    "Saudi Manufactured Products",
  ];
  const subcategoryOptions = {
    Construction: ["Sand", "Cement", "Wood", "Bricks"],
    "Plastic & Papers": [
      "Paper Cups",
      "Plastic Packaging",
      "Plastic Cups",
      "White Papers",
    ],
    Equipment: [
      "Drilling Equipment",
      "Transportation Equipment",
      "Coating Equipment",
      "Construction Equipment",
    ],
    "Saudi Manufactured Products": [
      "Subcategory 1",
      "Subcategory 2",
      "Subcategory 3",
      "Subcategory 4",
    ],
  };

  useEffect(() => {
    setSubcategory("");
  }, [category]);

  const handleAddField = (setter, variations) =>
    setter([...variations, { color: "", price: "" }]);
  const handleFieldChange = (setter, index, field, value) =>
    setter((prevVariations) =>
      prevVariations.map((variation, i) =>
        i === index ? { ...variation, [field]: value } : variation
      )
    );

  const handleAddPriceRange = () =>
    setPriceRanges([...priceRanges, { minQty: "", maxQty: "", price: "" }]);
  const handlePriceRangeChange = (index, field, value) =>
    setPriceRanges((prevRanges) =>
      prevRanges.map((range, i) =>
        i === index ? { ...range, [field]: value } : range
      )
    );

  const handleDimensionChange = (dimension, field, value) =>
    setDimensions((prevDimensions) => ({
      ...prevDimensions,
      [dimension]: { ...prevDimensions[dimension], [field]: value },
    }));

  const handleSpecialInputChange = (index, field, value) =>
    setSpecialInputs((prevSpecialInputs) =>
      prevSpecialInputs.map((input, i) =>
        i === index ? { ...input, [field]: value } : input
      )
    );

  const uploadImage = async (file) => {
    const imageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mainImageUrl = mainImage ? await uploadImage(mainImage) : null;
      const thumbnailImageUrl = thumbnailImage
        ? await uploadImage(thumbnailImage)
        : null;
      const productId = `${productName}${Math.floor(10 + Math.random() * 90)}`;

      const productData = {
        productId,
        productName,
        category,
        subcategory,
        location,
        description,
        stockQuantity,
        deliveryTime,
        colorVariations,
        sizeVariations,
        typeVariations,
        priceRanges,
        dimensions,
        specialInputs,
        images: { mainImage: mainImageUrl, thumbnailImage: thumbnailImageUrl },
        supplierName: username,
        categories: [...customCategories],
      };

      await addDoc(collection(db, "products"), productData);
      alert("Product added successfully!");

      // Reset form fields
      setProductName("");
      setCategory("");
      setSubcategory("");
      setLocation("");
      setDescription("");
      setStockQuantity("");
      setDeliveryTime("");
      setColorVariations([{ color: "", price: "" }]);
      setSizeVariations([{ size: "", price: "" }]);
      setTypeVariations([{ type: "", price: "" }]);
      setPriceRanges([{ minQty: "", maxQty: "", price: "" }]);
      setDimensions({
        height: { value: "", unit: "cm" },
        width: { value: "", unit: "cm" },
        length: { value: "", unit: "cm" },
        weight: { value: "", unit: "kg" },
      });
      setSpecialInputs([{ type: "", opcPrice: "", cementContent: "" }]);
      setMainImage(null);
      setThumbnailImage(null);
      document.getElementById("mainImage").value = null;
      document.getElementById("thumbnailImage").value = null;
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <Container>
      <h2 className='mb-4'>Add Product</h2>
      <p>Welcome, {username}!</p>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId='productName'>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product name'
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId='mainCategory'>
              <Form.Label>Main Category</Form.Label>
              <Form.Control
                as='select'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=''>Select Main Category</option>
                {customCategories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          {category && subcategoryOptions[category] && (
            <Col md={3}>
              <Form.Group controlId='subcategory'>
                <Form.Label>Subcategory</Form.Label>
                <Form.Control
                  as='select'
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                >
                  <option value=''>Select Subcategory</option>
                  {subcategoryOptions[category].map((sub, index) => (
                    <option key={index} value={sub}>
                      {sub}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          )}
        </Row>

        <Row className='mt-3'>
          <Col md={6}>
            <Form.Group controlId='location'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='text'
                placeholder='Location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='description'>
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Enter product description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className='mt-4'>
          <Col md={4}>
            <h5>Color Variations</h5>
            {colorVariations.map((variation, index) => (
              <Row key={index} className='mb-2'>
                <Col>
                  <Form.Control
                    type='text'
                    placeholder='Color'
                    value={variation.color}
                    onChange={(e) =>
                      handleFieldChange(
                        setColorVariations,
                        index,
                        "color",
                        e.target.value
                      )
                    }
                  />
                </Col>
                <Col>
                  <Form.Control
                    type='number'
                    placeholder='Price'
                    value={variation.price}
                    onChange={(e) =>
                      handleFieldChange(
                        setColorVariations,
                        index,
                        "price",
                        e.target.value
                      )
                    }
                  />
                </Col>
              </Row>
            ))}
            <Button
              variant='secondary'
              size='sm'
              onClick={() =>
                handleAddField(setColorVariations, colorVariations)
              }
            >
              + Add Color Variation
            </Button>
          </Col>

          <Col md={4}>
            <h5>Size Variations</h5>
            {sizeVariations.map((variation, index) => (
              <Row key={index} className='mb-2'>
                <Col>
                  <Form.Control
                    type='text'
                    placeholder='Size'
                    value={variation.size}
                    onChange={(e) =>
                      handleFieldChange(
                        setSizeVariations,
                        index,
                        "size",
                        e.target.value
                      )
                    }
                  />
                </Col>
                <Col>
                  <Form.Control
                    type='number'
                    placeholder='Price'
                    value={variation.price}
                    onChange={(e) =>
                      handleFieldChange(
                        setSizeVariations,
                        index,
                        "price",
                        e.target.value
                      )
                    }
                  />
                </Col>
              </Row>
            ))}
            <Button
              variant='secondary'
              size='sm'
              onClick={() => handleAddField(setSizeVariations, sizeVariations)}
            >
              + Add Size Variation
            </Button>
          </Col>

          <Col md={4}>
            <h5>Type Variations</h5>
            {typeVariations.map((variation, index) => (
              <Row key={index} className='mb-2'>
                <Col>
                  <Form.Control
                    type='text'
                    placeholder='Type'
                    value={variation.type}
                    onChange={(e) =>
                      handleFieldChange(
                        setTypeVariations,
                        index,
                        "type",
                        e.target.value
                      )
                    }
                  />
                </Col>
                <Col>
                  <Form.Control
                    type='number'
                    placeholder='Price'
                    value={variation.price}
                    onChange={(e) =>
                      handleFieldChange(
                        setTypeVariations,
                        index,
                        "price",
                        e.target.value
                      )
                    }
                  />
                </Col>
              </Row>
            ))}
            <Button
              variant='secondary'
              size='sm'
              onClick={() => handleAddField(setTypeVariations, typeVariations)}
            >
              + Add Type Variation
            </Button>
          </Col>
        </Row>

        <h5 className='mt-4'>Wholesale Price Ranges</h5>
        {priceRanges.map((range, index) => (
          <Row key={index} className='mb-2'>
            <Col md={4}>
              <Form.Control
                type='number'
                placeholder='Min Quantity'
                value={range.minQty}
                onChange={(e) =>
                  handlePriceRangeChange(index, "minQty", e.target.value)
                }
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type='number'
                placeholder='Max Quantity'
                value={range.maxQty}
                onChange={(e) =>
                  handlePriceRangeChange(index, "maxQty", e.target.value)
                }
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type='number'
                placeholder='Price'
                value={range.price}
                onChange={(e) =>
                  handlePriceRangeChange(index, "price", e.target.value)
                }
              />
            </Col>
          </Row>
        ))}
        <Button variant='secondary' size='sm' onClick={handleAddPriceRange}>
          + Add Price Range
        </Button>

        <h5 className='mt-4'>Dimensions</h5>
        <Row className='mb-3'>
          {["height", "width", "length", "weight"].map((dimension) => (
            <Col md={3} key={dimension}>
              <Form.Group controlId={`${dimension}Value`}>
                <Form.Label>
                  {dimension.charAt(0).toUpperCase() + dimension.slice(1)}
                </Form.Label>
                <div className='d-flex'>
                  <Form.Control
                    type='number'
                    placeholder={
                      dimension.charAt(0).toUpperCase() + dimension.slice(1)
                    }
                    value={dimensions[dimension].value}
                    onChange={(e) =>
                      handleDimensionChange(dimension, "value", e.target.value)
                    }
                  />
                  <Form.Control
                    as='select'
                    value={dimensions[dimension].unit}
                    onChange={(e) =>
                      handleDimensionChange(dimension, "unit", e.target.value)
                    }
                    className='ms-2'
                  >
                    {dimension === "weight" ? (
                      <>
                        <option value='kg'>kg</option>
                        <option value='g'>g</option>
                        <option value='lb'>lb</option>
                      </>
                    ) : (
                      <>
                        <option value='cm'>cm</option>
                        <option value='in'>in</option>
                        <option value='ft'>ft</option>
                      </>
                    )}
                  </Form.Control>
                </div>
              </Form.Group>
            </Col>
          ))}
        </Row>

        <h5 className='mt-4'>Special Input</h5>
        {specialInputs.map((input, index) => (
          <Row key={index} className='mb-2'>
            <Col md={4}>
              <Form.Control
                type='text'
                placeholder='Type'
                value={input.type}
                onChange={(e) =>
                  handleSpecialInputChange(index, "type", e.target.value)
                }
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type='number'
                placeholder='Cement Content'
                value={input.cementContent}
                onChange={(e) =>
                  handleSpecialInputChange(
                    index,
                    "cementContent",
                    e.target.value
                  )
                }
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type='number'
                placeholder='Price'
                value={input.opcPrice}
                onChange={(e) =>
                  handleSpecialInputChange(index, "opcPrice", e.target.value)
                }
              />
            </Col>
          </Row>
        ))}
        <Button
          variant='secondary'
          size='sm'
          onClick={() =>
            setSpecialInputs([
              ...specialInputs,
              { type: "", opcPrice: "", cementContent: "" },
            ])
          }
        >
          + Add Special Input
        </Button>

        <h5 className='mt-4'>Product Images</h5>
        <Row>
          <Col md={6}>
            <Form.Group controlId='mainImage'>
              <Form.Label>Main Image</Form.Label>
              <Form.Control
                type='file'
                onChange={(e) => setMainImage(e.target.files[0])}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='thumbnailImage'>
              <Form.Label>Thumbnail Image</Form.Label>
              <Form.Control
                type='file'
                onChange={(e) => setThumbnailImage(e.target.files[0])}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className='text-center mt-4 d-flex justify-content-center'>
          <Button
            type='submit'
            variant='success'
            size='md'
            style={{
              backgroundColor: "#2d6a4f",
              borderColor: "#2d6a4f",
              width: "250px",
            }}
          >
            Add Product
          </Button>
          <Button
            type='button'
            variant='secondary'
            size='md'
            style={{ width: "150px", marginLeft: "10px" }}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddProduct;
