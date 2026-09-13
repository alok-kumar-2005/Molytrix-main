import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const backendURL = import.meta.env.VITE_BACKEND_URL;

import AdminProduct from "../components/AdminProduct";
import {
  Search,
  Filter,
  Star,
  Droplets,
  Thermometer,
  Shield,
  Clock,
  Beaker,
  Wrench,
  Truck,
  Factory,
} from "lucide-react";
import img3 from "../img/Greases/Lithomax Ep 2.png";
import img4 from "../img/Greases/Lithplex Blue 220.png";
import img5 from "../img/Greases/SULPHOCAL 220.png";
import img6 from "../img/Greases/polyplex EM 100.png";
import img7 from "../img/Greases/polyplex HT 460.png";
import img8 from "../img/Greases/Spinplex 22.png";
import img1 from "../img/Hydromax Series/Hydromax HVI 46.png";
import img2 from "../img/Hydromax Series/Hydromax AW 68.png";
import img9 from "../img/Hydromax Series/Hydromax HLPD 68.png";
import img10 from "../img/Hydromax Series/Hydromax HLPD 46.png";
import img11 from "../img/Hydromax Series/Hydromax AW 32.png";
import img12 from "../img/Hydromax Series/Hydromax AW 46.png";
import img33 from "../img/Hydromax Series/Hydromax HVI 68.png";
import img13 from "../img/Aerosols/Anti Spatter Spray.jpg";
import img14 from "../img/Aerosols/Electrical Contact Cleaner Spray.jpg";
import img15 from "../img/Aerosols/PCB card coating spray.jpg";
import img16 from "../img/Aerosols/Rust Penetrate Spray.jpg";
import img17 from "../img/Engine Oil series/Engine Oil Turbo-X 15W40 CI4 Plus.png";
import img18 from "../img/Gear Oil series/Geardrive EP 100.png";
import img19 from "../img/Gear Oil series/Geardrive EP 150.png";
import img20 from "../img/Gear Oil series/Geardrive EP 220.png";
import img21 from "../img/Gear Oil series/Geardrive EP 320.jpg";
import img22 from "../img/Gear Oil series/Geardrive EP 460.png";
import img23 from "../img/Gear Oil series/Geardrive EP 680.png";
import img24 from "../img/Gear Oil series/Geardrive Synth EP 220.png";
import img25 from "../img/Gear Oil series/Geardrive Synth EP 320.png";
import img26 from "../img/Gear Oil series/Geardrive Synth PG 220.png";
import img27 from "../img/Gear Oil series/Geardrive Synth PG 320.png";
import img28 from "../img/Greases/Lithomax Ep 0.png";
import img29 from "../img/Greases/Lithomax Ep 00.png";
import img30 from "../img/Greases/Lithomax Ep 1.png";
import img31 from "../img/Greases/Lithomax Ep 3.png";
import img32 from "../img/Greases/SULPHOCAL 460.png";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
const [currentUser, setCurrentUser] = useState(null);
const [isAdmin, setIsAdmin] = useState(false);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  // Add this function to check if user is admin
const checkAdminStatus = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (token && user) {
    try {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      // Check if user email matches admin email
      setIsAdmin(userData.email === 'molytrixpetrochem25@gmail.com');
    } catch (error) {
      console.error('Error parsing user data:', error);
      setIsAdmin(false);
    }
  } else {
    setIsAdmin(false);
  }
};

useEffect(() => {
  checkAdminStatus();
}, []);

  // Function to fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/api/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      
      // Transform API products to match your existing product structure
      const transformedProducts = data.products.map((product) => ({
        id: product._id,
        name: product.heading,
        category: "all", // You can modify this based on your needs
        image: `${backendURL}${product.image}`, // Full URL for the image
        rating: 4.5, // Default rating, you can add this field to your backend
        description: product.description,
        volume: product.availablesizes,
        specifications: {
          viscosityIndex: product.viscosityindex,
          flashPoint: product.flashpoint,
          applications: product.applications,
        },
        features: product.keyfeatures || [], // Ensure it's an array
        certifications: product.certifications || [], // Ensure it's an array
        isApiProduct: true, // Flag to identify API products
      }));
      
      setApiProducts(transformedProducts);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products from server");
    } finally {
      setLoading(false);
    }
  };

  // 2. Add this delete function after the fetchProducts function
const deleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to delete products');
      return;
    }

    if (!isAdmin) {
      alert('You do not have permission to delete products');
      return;
    }

    const response = await fetch(`${backendURL}/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete product');
    }

    // Refresh the products list
    fetchProducts();
    setDeleteConfirm(null);
    alert('Product deleted successfully');
  } catch (err) {
    console.error('Error deleting product:', err);
    alert('Failed to delete product: ' + err.message);
  }
};

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Refetch products when a new product is added
  const handleProductAdded = () => {
    fetchProducts();
  };

  // Hardcoded products (your existing ones) - FIXED CATEGORIES
 const hardcodedProducts = [
{
  id: "1",
  name: "Hydromax HVI 46",
  category: "Hydromax",
  image: img1,
  rating: 4.5,
  shortTitle: "Mineral based high performance hydraulic fluid with high viscosity index",
  description:
    "High performance hydraulic fluid, based on the latest base oil and additive technology. The use of a special additive pack warrants optimal performance and a long service life.",
  specifications: [
    "Vickers I-286-S & M-2950-S",
    "AFNOR NF E 48-603 HL",
    "DIN 51 524 PART 3 (HVLP)",
    "FZG A/8.3/90 > 12 (ISO VG 46 and 68)",
    "FZG A/8.3/90 = 12 (ISO VG 32)",
    "CINCINATTI MILACRON P68/P69/P70 (ISO VG 32-68)",
    "VDMA 24318",
    "Thyssen HT-N-256132",
    "US STEEL 126/127",
  ],
  isApiProduct: false,
},
{
  id: "33",
  name: "Hydromax HVI 68",
  category: "Hydromax",
  image: img33,
  rating: 4.5,
  shortTitle: "Mineral based high performance hydraulic fluid with high viscosity index",
  description:
    "High performance hydraulic fluid, based on the latest base oil and additive technology. The use of a special additive pack warrants optimal performance and a long service life.",
  specifications: [
    "Vickers I-286-S & M-2950-S",
    "AFNOR NF E 48-603 HL",
    "DIN 51 524 PART 3 (HVLP)",
    "FZG A/8.3/90 > 12 (ISO VG 46 and 68)",
    "FZG A/8.3/90 = 12 (ISO VG 32)",
    "CINCINATTI MILACRON P68/P69/P70 (ISO VG 32-68)",
    "VDMA 24318",
    "Thyssen HT-N-256132",
    "US STEEL 126/127",
  ],
  isApiProduct: false,
},


    {
      id: "2",
      name: "Hydromax AW 68",
      category: "Hydromax",
      image: img2,
      rating: 4.3,
      description:
        "High performance hydraulic fluid, based on the latest base oil and additive technology. The use of an special additive pack warrants optimal performance and a long service life.",
      specifications: [
        "Vickers 1-286-S & M-2950-S",
        "AFNOR NF E 48-603 HM",
        "DIN 51 524 PART 2 (HLP)",
        "VDMA 24318",
        "US STEEL 126/127",
        "Thyssen TH-N-256132",
        "FZG A/8.3/90 > 12 (ISO VG 46 and higher)",
        "FZG A/8.3/90 = 12 (ISO VG 15, 22 and 32)",
        "CINCINATTI MILACRON P68/P69/P70 (ISO VG 32-68)"
      ],
      isApiProduct: false,
    },
    {
      id: "3",
      name: "Lithomax EP 2",
      category: "Grease",
      image: img3,
      rating: 4.7,
      description:
        "This product is specially formulated to lubricate all sorts of equipment and mechanisms. The grease will perform excellent for on- and off- road equipment, manufacturing, agriculture, mining, marine, forestry and general-purpose applications.",
      specifications: [
        "DIN 51502", "DIN 51825 KP N-30", "ISO 6743/9 L-XCDHB",
      ],
      isApiProduct: false,
    },
    {
      id: "4",
      name: "Lithplex Blue 220",
      category: "Grease",
      image: img4,
      rating: 4.6,
      description:
        "This product is a lithium complex thickened lubricating grease based on mineral oil. The grease contains antioxidants, corrosion inhibitors, extreme pressure and anti-wear additives. The lithium complex soap makes this grease suitable for applications within a very wide temperature range and specially applications at high temperatures. The complex soap structure also gives the product a high degree of mechanical stability, which prolongs re-lubrication intervals.",
      specifications: [
        "DIN 51502", "DIN 51825 KP2P-30", "ISO 6743/9 L-XCEEB2", "ASTM D-4950 GC/LB",
            ],
      isApiProduct: false,
    },
    {
      id: "5",
      name: "Sulphocal 220",
      category: "Grease",
      image: img5,
      rating: 4.8,
      description:
        "This product is a calcium sulphonate complex thickened grease based on mineral oil with a high drop point and high resistance to cold and salt water as well as vapour resistance. The grease is as well provided with superior lubricating and sealing capacity and offers increased load carrying capacity. It offers corrosion protection and excellent water resistance which are essential in wet and corrosive environment.",
      specifications: [
        "DIN 51502", "DIN 51825 KP2U-30 / OG2U-30", "ISO 6743-9 L-XBFHB2",
      ],
      isApiProduct: false,
    },
    {
      id: "6",
      name: "Polyplex EM 100",
      category: "Grease",
      image: img6,
      rating: 4.4,
      description:
        "This product is specially formulated to lubricate all sorts of equipment and mechanisms. The grease will perform excellent for on- and off- road equipment, manufacturing, agriculture, mining, marine, forestry and general-purpose applications.",
      specifications: [
        "Medium and high speed bearings", "Bearings in cold environments and cooling systems", "Electric motor bearings", "Fan bearings, exhausters and pumps", "Oven wagon and drying tunnel bearings", "Bearings in conveyor belts", "Bearings and bolts in chains operated under strong temperatures variations", "Plain bearings and joints in plastic-plastic and plastic-metal contacts","Lubrication of wire guides, plastic bearings and slides",
      ],
      isApiProduct: false,
    }, 
    {
      id: "7",
      name: "POLYPLEX HT 460",
      category: "Grease",
      image: img7,
      rating: 4.5,
      description:
      "New technology high efficiency lubricating grease with a high viscosity base oil. It is formulated with a long life organic thickener, highly refined mineral oil and additive package to provide superior anti wear, EP properties and high antioxidant and anticorrosive capacity. The grease is perfectly suitable for bearing lubrication and for mechanisms exposed to the combined action of high temperatures, heavy loads and water action. This product is specially intended for the lubrication of mechanisms operating in severe conditions, more specifically in conditions such as those found in continuous casting bearings which are operating under high service temperature and pressures and where big quantities of cooling water and contaminating materials are present.",
      isApiProduct: false,
    },
    {
      id: "8",
      name: "SPINPLEX 22",
      category: "Grease",
      image: img8,
      rating: 4.3,
      description:
      "This product is a complex soap thickened synthetic grease. It provides high resistance to oxidation, superior anticorrosive capacity, E.P. characteristics, good adherence to metal and good resistance to water, and resistance to vapour, acid and alkaline solutions.",
      isApiProduct: false,
    },
    {
      id: "9",
      name: "Hydromax HLPD 68",
      category: "Hydromax",
      image: img9,
      rating: 4.6,
      description:
        "High performance hydraulic fluid, based on the latest base oil and additive technology. This product is a so called detergent hydraulic fluid and therefore very suitable where miscibility with water is required. It is formulated using ashless chemistry, is detergent and will keep systems clean while operating.",
      isApiProduct: false,
    }, 
    {
      id: "10",
      name: "Hydropmax HLPD 46",
      category: "Hydromax",
      image: img10,
      rating: 4.4,
      description:
        "High performance hydraulic fluid, based on the latest base oil and additive technology. This product is a so called detergent hydraulic fluid and therefore very suitable where miscibility with water is required. It is formulated using ashless chemistry, is detergent and will keep systems clean while operating.",
      isApiProduct: false,
    },
    {
      id: "11",
      name: "Hydromax AW 32",
      category: "Hydromax",
      image: img11,
      rating: 4.7,
      shortTitle: "Mineral based high performance hydraulic fluid",
      description:
"High performance hydraulic fluid, based on the latest base oil and additive technology. The use of an ashless additive pack warrants optimal performance and a long service life. It can be used in all available hydraulic applications, as well as light gear boxes and is perfectly suitable for general lubrication purposes.",
            specifications: [
        "Vickers 1-286-S & M-2950-S",
        "AFNOR NF E 48-603 HM",
        "DIN 51 524 PART 2 (HLP)",
        "VDMA 24318",
        "US STEEL 126/127",
        "Thyssen TH-N-256132",
        "FZG A/8.3/90 > 12 (ISO VG 46 and higher)",
        "FZG A/8.3/90 = 12 (ISO VG 15, 22 and 32)",
        "CINCINATTI MILACRON P68/P69/P70 (ISO VG 32-68)"
      ],
      isApiProduct: false,
    }, 
    {
      id: "12",
      name: "Hydromax AW 46",
      category: "Hydromax",
      image: img12,
      rating: 4.5,
      shortTitle: "Mineral based high performance hydraulic fluid",
      description:
"High performance hydraulic fluid, based on the latest base oil and additive technology. The use of an ashless additive pack warrants optimal performance and a long service life. It can be used in all available hydraulic applications, as well as light gear boxes and is perfectly suitable for general lubrication purposes.",
            specifications: [
        "Vickers 1-286-S & M-2950-S",
        "AFNOR NF E 48-603 HM",
        "DIN 51 524 PART 2 (HLP)",
        "VDMA 24318",
        "US STEEL 126/127",
        "Thyssen TH-N-256132",
        "FZG A/8.3/90 > 12 (ISO VG 46 and higher)",
        "FZG A/8.3/90 = 12 (ISO VG 15, 22 and 32)",
        "CINCINATTI MILACRON P68/P69/P70 (ISO VG 32-68)"
      ],
      isApiProduct: false,
    },
    {
      id: "13",
      name: "Anti Spatter Spray",
      category: "Aerosols",
      image: img13,
      rating: 4.2,
      description:
        "Anti Spatter Spray is a high-performance aerosol formulation designed to prevent welding spatter from adhering to metal surfaces, welding equipment, and nozzles. It ensures cleaner welds and reduces post-welding cleanup, saving time and effort in production.",
      isApiProduct: false,
    },
    {
      id: "14",
      name: "Electrical Contact Cleaner Spray",
      category: "Aerosols",
      image: img14,
      rating: 4.3,
      description:
        "Electrical Contact Cleaner Spray is a specialized aerosol cleaner designed to remove dirt, grease, and oxidation from electrical contacts and connections. It ensures optimal conductivity and prevents electrical failures caused by contamination.",
      specifications: [
        "Safe for use on plastics and rubber",
      ],
      isApiProduct: false,
    },
    {
      id: "15",
      name: "PCB Card Coating Spray",
      category: "Aerosols",
      image: img15,
      rating: 4.4,
      description:
        "PCB Card Coating Spray is a fast-drying, transparent protective conformal coating designed to shield printed circuit boards (PCBs) and electronic components from moisture, corrosion, dust, and environmental contaminants. It enhances reliability and extends the life of electronic assemblies.",
      isApiProduct: false,
    },
    {
      id: "16",
      name: "Rust Penetrate Spray",
      category: "Aerosols",
      image: img16,
      rating: 4.6,
      description:
        "Rust Penetrate Spray is a powerful penetrating oil designed to loosen rusted or corroded parts, making it easier to disassemble machinery, tools, and equipment. It provides excellent lubrication and protection against further rust and corrosion.",
      isApiProduct: false,
    },
    {
      id: "17",
      name: "Engine Oil Turbo-X 15W40 CI4 Plus",
      category: "engine-oil",
      image: img17,
      rating: 4.8,
      description:
        "Engine Oil Turbo-X 15W40 CI4 Plus is a high-performance, multi-grade engine oil designed for use in turbocharged and naturally aspirated diesel engines. It provides excellent wear protection, thermal stability, and cleanliness, ensuring optimal engine performance and longevity.",
      isApiProduct: false,
    },
    {
      id: "18",
      name: "GearDrive EP 100",
      category: "Gear Oil",
      image: img18,
      rating: 4.5,
      description:
        "GearDrive EP 100 is a high-performance gear oil formulated to provide superior lubrication and protection for various types of gear systems. It is designed to withstand extreme pressure and temperature conditions, ensuring smooth operation and extended service life of gears.",
      isApiProduct: false,
    },
    {
      id: "19",
      name: "GearDrive EP 150",
      category: "Gear Oil",
      image: img19,
      rating: 4.4,
      description:
        "GearDrive EP 150 is a high-performance gear oil formulated to provide superior lubrication and protection for various types of gear systems. It is designed to withstand extreme pressure and temperature conditions, ensuring smooth operation and extended service life of gears.",
      isApiProduct: false,
    },
    {
      id: "20",
      name: "GearDrive EP 220",
      category: "Gear Oil",
      image: img20,
      rating: 4.6,
      description:
        "GearDrive EP 220 is a high-performance gear oil formulated to provide superior lubrication and protection for various types of gear systems. It is designed to withstand extreme pressure and temperature conditions, ensuring smooth operation and extended service life of gears.",
      isApiProduct: false,
    },{
      id: "21",
      name: "GearDrive EP 320",
      category: "Gear Oil",
      image: img21,
      rating: 4.7,
      description:
        "GearDrive EP 320 is a high-performance gear oil formulated to provide superior lubrication and protection for various types of gear systems. It is designed to withstand extreme pressure and temperature conditions, ensuring smooth operation and extended service life of gears.",
      isApiProduct: false,
    },{
      id: "22",
      name: "GearDrive EP 460",
      category: "Gear Oil",
      image: img22,
      rating: 4.5,
      description:
        "GearDrive EP 460 is a high-performance gear oil formulated to provide superior lubrication and protection for various types of gear systems. It is designed to withstand extreme pressure and temperature conditions, ensuring smooth operation and extended service life of gears.",
      isApiProduct: false,
    },{
      id: "23",
      name: "GearDrive EP 680",
      category: "Gear Oil",
      image: img23,
      rating: 4.8,
      description:
        "GearDrive EP 680 is a high-performance gear oil formulated to provide superior lubrication and protection for various types of gear systems. It is designed to withstand extreme pressure and temperature conditions, ensuring smooth operation and extended service life of gears.",
      isApiProduct: false,
    },{
      id: "24",
      name: "Geardrive Synth EP 220",
      category: "Gear Oil",
      image: img24,
      rating: 4.9,
      description:
        "Geardrive Synth EP 220 is a synthetic gear oil designed for high-performance applications. It provides excellent lubrication and protection for gear systems operating under extreme pressure and temperature conditions, ensuring smooth operation and extended service life.",
      isApiProduct: false,
    },{
      id: "25",
      name: "Geardrive Synth EP 320",
      category: "Gear Oil",
      image: img25,
      rating: 4.8,
      description:
        "Geardrive Synth EP 320 is a synthetic gear oil designed for high-performance applications. It provides excellent lubrication and protection for gear systems operating under extreme pressure and temperature conditions, ensuring smooth operation and extended service life.",
      isApiProduct: false,
    },
    {
      id: "26",
      name: "Geardrive Synth PG 220",
      category: "Gear Oil",
      image: img26,
      rating: 4.7,
      description:
        "Geardrive Synth PG 220 is a synthetic gear oil designed for high-performance applications. It provides excellent lubrication and protection for gear systems operating under extreme pressure and temperature conditions, ensuring smooth operation and extended service life.",
      isApiProduct: false,
    },
    {
      id: "27",
      name: "Geardrive Synth PG 320",
      category: "Gear Oil",
      image: img27,
      rating: 4.6,
      description:
        "Geardrive Synth PG 320 is a synthetic gear oil designed for high-performance applications. It provides excellent lubrication and protection for gear systems operating under extreme pressure and temperature conditions, ensuring smooth operation and extended service life.",
      isApiProduct: false,
    },
    {
      id: "28",
      name: "Lithomax EP 0",
      category: "Grease",
      image: img28,
      rating: 4.4,
      description:
        "Lithomax EP 0 is a high-performance lithium-based grease designed for use in various industrial and automotive applications. It provides excellent lubrication, corrosion protection, and resistance to water washout, ensuring optimal performance in demanding conditions.",
      isApiProduct: false,
    },
    {
      id: "29",
      name: "Lithomax EP 00",
      category: "Grease",
      image: img29,
      rating: 4.3,
      description:
      "This product is a range of lithium soap thickened greases available in different NLGI classes. The product is a general-purpose product designed to perform in a wide variety of application requiring a grease with EP properties and load-carrying capacity. Contains an extreme pressure additive technology which has a low impact on the environment. This product is particularly suitable for use in heavy duty bearings and general industrial lubrication.",
      specifications: [
      "DIN 51502", "DIN 51825 KP N-30", "ISO 6743/9 L-XCDHB",
    ],
      isApiProduct: false,
    },
    {
      id: "30",
      name: "Lithomax EP 1",
      category: "Grease",
      image: img30,
      rating: 4.5,
      description:
      "This product is a range of lithium soap thickened greases available in different NLGI classes. The product is a general-purpose product designed to perform in a wide variety of application requiring a grease with EP properties and load-carrying capacity. Contains an extreme pressure additive technology which has a low impact on the environment. This product is specially formulated to lubricate all sorts of equipment and mechanisms. The grease will perform excellent for on- and off- road equipment, manufacturing, agriculture, mining, marine, forestry and general-purpose applications. This product is particularly suitable for use in heavy duty bearings and general industrial lubrication.",
      specifications: [
        "DIN 51502", "DIN 51825 KP N-30", "ISO 6743/9 L-XCDHB",
      ],
      isApiProduct: false,
    },
    {
      id: "31",
      name: "Lithomax EP 3",
      category: "Grease",
      image: img31,
      rating: 4.6,
      description:
      "This product is a range of lithium soap thickened greases available in different NLGI classes. The product is a general-purpose product designed to perform in a wide variety of application requiring a grease with EP properties and load-carrying capacity. Contains an extreme pressure additive technology which has a low impact on the environment. This product is specially formulated to lubricate all sorts of equipment and mechanisms. The grease will perform excellent for on- and off- road equipment, manufacturing, agriculture, mining, marine, forestry and general-purpose applications. This product is particularly suitable for use in heavy duty bearings and general industrial lubrication.",
      specifications: [
        "DIN 51502", "DIN 51825 KP N-30", "ISO 6743/9 L-XCDHB",
      ],
      isApiProduct: false,
    },
    {
      id: "32",
      name: "Sulphocal 460",
      category: "Grease",
      image: img32,
      rating: 4.7,
      description:
        "Sulphocal 460 is a high-performance calcium sulphonate complex grease designed for use in heavy-duty applications. It provides excellent lubrication, corrosion protection, and resistance to water washout, ensuring optimal performance in demanding conditions.",
      isApiProduct: false,
    },
  ];
  // Combine hardcoded products with API products
  const allProducts = [...hardcodedProducts, ...apiProducts];


  const categories = [
    { id: "all", name: "All Products", icon: <Droplets className="h-4 w-4" /> },
    {
      id: "engine-oil",
      name: "Engine Oil",
      icon: <Wrench className="h-4 w-4" />,
    },
    {
      id: "Hydromax",
      name: "Hydraulic Oil",
      icon: <Factory className="h-4 w-4" />,
    },
    { id: "Gear Oil", name: "Gear Oil", icon: <Wrench className="h-4 w-4" /> },
    { id: "Grease", name: "Grease", icon: <Droplets className="h-4 w-4" /> },
    { id: "Aerosols", name: "Aerosols", icon: <Beaker className="h-4 w-4" /> },
  ];



  // FIXED FILTERING LOGIC
  const filteredProducts = allProducts
    .filter((product) => {
      // Category filter
      const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
      
      // Search filter
      const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Features filter - FIXED LOGIC
      const featuresMatch = selectedFeatures.length === 0 || 
        selectedFeatures.some((featureId) => {
          const featureName = lubricantFeatures.find(f => f.id === featureId)?.name;
          return product.features && Array.isArray(product.features) && 
                 product.features.includes(featureName);
        });

      return categoryMatch && searchMatch && featuresMatch;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading && apiProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-200 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Our Products
          </h1>
          <p className="text-gray-600">
            Discover our comprehensive range of premium lubricants and
            industrial fluids
          </p>
          {error && (
            <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="category">Sort by Category</option>
              </select>
            </div>
          </div>

          {/* Lubricant Features Checkboxes */}
          <div className="border-t pt-6">

            {selectedFeatures.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">
                  Selected features:
                </span>
                {selectedFeatures.map((featureId) => {
                  const feature = lubricantFeatures.find(
                    (f) => f.id === featureId
                  );
                  return (
                    <span
                      key={featureId}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {feature?.name}
                      <button
                        onClick={() => handleFeatureChange(featureId)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
                <button
                  onClick={() => setSelectedFeatures([])}
                  className="text-xs text-gray-500 hover:text-gray-700 underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
         {filteredProducts.map((product) => (
  <div
    key={product.id}
    className="rounded-3xl bg-white shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
  >
    {/* Product Image */}
    <div className="mb-4 flex justify-center">
      <img
        src={product.image}
        alt={product.name}
        className="h-32 w-32 object-cover rounded-lg"
        onError={(e) => {
          e.target.src = img1;
        }}
      />
    </div>

    {/* Product Name & Description */}
    <div className="mb-4">
      <h3 className="text-base sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-semibold text-gray-900">
        {product.name}
        {product.isApiProduct && (
          <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            New
          </span>
        )}
      </h3>
      <p className="text-sm text-gray-600 mt-1 line-clamp-3">
        {product.description}
      </p>
    </div>

    {/* Buttons Container */}
    <div className="mt-auto flex flex-col gap-2">
      {/* View Details Button */}
      <button 
        onClick={() => { handleViewDetails(product) }} 
        className="boton-elegante"
      >
        Details
      </button>

      {/* Delete Button - Only show for API products AND if user is admin */}
      {product.isApiProduct && isAdmin && (
        <button 
          onClick={() => setDeleteConfirm(product)} 
          className="boton-delete"
        >
          Delete
        </button>
      )}
    </div>

    <style>{`
      .boton-elegante {
        width: 80%;
        margin: 0 auto;
        padding: 10px 20px;
        border: 2px solid #2c2c2c;
        background-color: #1a1a1a;
        color: #ffffff;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 30px;
        transition: all 0.4s ease;
        outline: none;
        position: relative;
        overflow: hidden;
        font-weight: bold;
      }

      .boton-elegante::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(
          circle,
          rgba(255, 255, 255, 0.25) 0%,
          rgba(255, 255, 255, 0) 70%
        );
        transform: scale(0);
        transition: transform 0.5s ease;
      }

      .boton-elegante:hover::after {
        transform: scale(4);
      }

      .boton-elegante:hover {
        border-color: #666666;
        background: #292929;
      }

      .boton-delete {
        width: 80%;
        margin: 0 auto;
        padding: 8px 16px;
        border: 2px solid #dc2626;
        background-color: #dc2626;
        color: #ffffff;
        font-size: 0.9rem;
        cursor: pointer;
        border-radius: 30px;
        transition: all 0.3s ease;
        outline: none;
        font-weight: bold;
      }

      .boton-delete:hover {
        background-color: #b91c1c;
        border-color: #b91c1c;
        transform: translateY(-1px);
      }

      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `}</style>
  </div>
))}

        </div>

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              key="product-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            >
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-6 rounded-lg max-w-[80%] w-full shadow-lg relative overflow-y-auto max-h-[90vh]"
              >
                <button
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-lg z-10"
                >
                  ✕
                </button>

                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full md:w-1/2 h-auto rounded-xl object-cover"
                    onError={(e) => {
                      e.target.src = img1;
                    }}
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">
                      {selectedProduct.name}
                    </h2>
                  

<h3 className="text-lg font-semibold text-gray-900 mb-2">
  {selectedProduct.shortTitle}
</h3>
<p className="text-gray-700 mb-4">
  {selectedProduct.description}
</p>


                    {selectedProduct.viscosity && (
                      <p className="mb-2">
                        <strong>Viscosity:</strong> {selectedProduct.viscosity}
                      </p>
                    )}
                    {selectedProduct.volume && (
                      <p className="mb-2">
                        <strong>Available Volumes:</strong> {selectedProduct.volume}
                      </p>
                    )}

                    {selectedProduct.specifications && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Specifications:</h4>
                        {Array.isArray(selectedProduct.specifications) ? (
                          <ul className="list-disc list-inside text-sm text-gray-700">
                            {selectedProduct.specifications.map((spec, idx) => (
                              <li key={idx}>{spec}</li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="list-disc list-inside text-sm text-gray-700">
                            {Object.entries(selectedProduct.specifications).map(
                              ([key, value]) => (
                                <li key={key}>
                                  <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong>{" "}
                                  {Array.isArray(value) ? value.join(", ") : value}
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      </div>
                    )}



                    {selectedProduct.certifications && selectedProduct.certifications.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Certifications:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                          {selectedProduct.certifications.map((cert, idx) => (
                            <li key={idx}>{cert}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Delete Confirmation Modal */}
{/* Delete Confirmation Modal */}
<AnimatePresence>
  {deleteConfirm && (
    <motion.div
      key="delete-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg max-w-md w-full mx-4 shadow-lg"
      >
        <h3 className="text-xl font-bold mb-4 text-gray-900">
          Confirm Delete
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete "<strong>{deleteConfirm.name}</strong>"? 
          This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setDeleteConfirm(null)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteProduct(deleteConfirm.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>



        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <img
              src="/LOGO2.jpg"
              alt="Company Logo"
              className="h-20 w-auto mx-auto mb-4 opacity-35"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}

        {/* Product Count */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {allProducts.length} products
            {apiProducts.length > 0 && (
              <span className="text-green-600 ml-2">
                ({apiProducts.length} from database)
              </span>
            )}
          </p>
        </div>

        {/* Add Product Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAddProduct((prev) => !prev)}
            className="bg-black text-white px-6 py-2 rounded-md shadow-md hover:bg-gray-700 transition duration-300"
          >
            {showAddProduct ? "Hide Add Product" : "Add Product"}
          </button>
        </div>

        {showAddProduct && (
          <div className="flex flex-col items-center mt-8 gap-4 w-full">
            <h2 className="text-[32px] font-bold">Add New Product</h2>
            <div className="w-full max-w-2xl">
              <AdminProduct onProductAdded={handleProductAdded} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;