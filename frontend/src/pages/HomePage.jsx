import React from 'react';
import { Cover } from "../components/ui/cover";
import { Link } from 'react-router-dom';
import img from '../img/home1.png';
import DistributorTable from '../pages/Distributors';
import InsightButton from '../components/ui/insightsbutton';
import { 
  Shield, 
  Truck, 
  Users, 
  Award, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle
} from 'lucide-react';
const HomePage = () => {
  return (

    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0f0f0f] via-[#1a1a2e] to-[#3a3a55] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#F97316]/20 text-[#F97316] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Trusted Since 2012
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="block text-xl sm:text-3xl md:text-3xl lg:text-4xl text-[#FBBF24] bg-gradient-to-r from-[#FBBF24] to-[#F97316] bg-clip-text text-transparent">
              <Cover>Powering Performance</Cover> 
              </span>
                <span className="block text-white text-4xl md:text-4xl mt-2">With Precision Lubrication</span>
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-[#D1FAE5] leading-relaxed max-w-2xl">
                High-Performance Greases and Industrial Lubricants for Every Industry                
                <span className="block mt-2 text-lg text-[#FBBF24]">
                  Keep your operations running at maximum efficiency.
                </span>
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 mb-10 py-6 border-t border-b border-[#3B82F6]/30">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#FBBF24]">12+</div>
                  <div className="text-sm text-[#D1FAE5]">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#FBBF24]">500+</div>
                  <div className="text-sm text-[#D1FAE5]">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#FBBF24]">24/7</div>
                  <div className="text-sm text-[#D1FAE5]">Support</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
        <Link to="/products">
          <button className="learn-more group">
            <span className="circle bg-[#1e1e2e] group-hover:bg-gradient-to-r from-[#F97316] to-[#FBBF24] transition-all duration-500 ease-in-out">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text group-hover:text-white">explore Products</span>
          </button>

              <style jsx>{`
                button {
                  position: relative;
                  display: inline-block;
                  cursor: pointer;
                  outline: none;
                  border: 0;
                  vertical-align: middle;
                  text-decoration: none;
                  background: transparent;
                  padding: 0;
                  font-size: inherit;
                  font-family: inherit;
                }

                button.learn-more {
                  width: 15rem;
                  height: auto;
                }

                button.learn-more .circle {
                  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
                  position: relative;
                  display: block;
                  margin: 0;
                  width: 3.5rem;
                  height: 3.5rem;
                  border-radius: 1.625rem;
                }

                button.learn-more .circle .icon {
                  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  margin: auto;
                  background: #fff;
                }

                button.learn-more .circle .icon.arrow {
                  left: 0.75rem;
                  width: 1.25rem;
                  height: 0.125rem;
                  background: none;
                }

                button.learn-more .circle .icon.arrow::before {
                  position: absolute;
                  content: "";
                  top: -0.29rem;
                  right: 0.0625rem;
                  width: 0.625rem;
                  height: 0.625rem;
                  border-top: 0.125rem solid #fff;
                  border-right: 0.125rem solid #fff;
                  transform: rotate(45deg);
                }

                button.learn-more .button-text {
                  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  padding: 0.9rem 0;
                  margin: 0 0 0 2.2rem;
                  color: #fbbf24;
                  font-weight: 700;
                  font-size: 1.05rem;
                  line-height: 1.6;
                  text-align: center;
                  text-transform: uppercase;
                }

                button:hover .circle {
                  width: 100%;
                }

                button:hover .circle .icon.arrow {
                  background: #fff;
                  transform: translate(1rem, 0);
                }

                button:hover .button-text {
                  color: #fff;
                }
              `}</style>
                </Link>
                <Link
                  to="/register"
                  className="border-2 border-white/80 text-white hover:bg-white hover:text-[#1E3A8A] px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-flex items-center justify-center backdrop-blur-sm hover:backdrop-blur-none"
                >
                  Get Quote
                </Link>
              </div>
            </div>
            <div className="relative lg:ml-20">
              {/* <div className="absolute inset-0 bg-gradient-to-r from-[#F97316]/20 to-[#FBBF24]/20 rounded-2xl blur-3xl"></div> */}
              <img
                src={img}
                alt="Industrial machinery"
                className="relative"
              />
              <div className="absolute"></div>
              {/* Floating Quality Badge */}
              <div className="absolute -top-1 -right-4 bg-white text-[#1E3A8A] px-6 py-3 rounded-full shadow-lg">
                <div className="text-sm font-bold">ISO 2012</div>
                <div className="text-xs">Certified</div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Molytrix Petrochem?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Molytrix Petrochem oil and greases are an excellent choice for those seeking high-performance lubrication solutions across automotive, industrial, and heavy-duty applications. Engineered with advanced additives such as molybdenum disulfide (MoS2), these products are designed to reduce friction, minimize wear, and enhance equipment lifespan, even under extreme pressure and temperature conditions. Molytrix lubricants offer superior resistance to oxidation, thermal breakdown, and water washout, making them ideal for harsh environments. They also provide reliable protection against rust and corrosion, helping to lower maintenance costs and extend service intervals. With formulations that meet or exceed global standards like API, SAE, and ISO, Molytrix delivers quality and performance that rivals leading international brands, making it a cost-effective and dependable choice for both industrial and automotive needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Shield className="h-8 w-8 text-blue-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                All our products meet international quality standards and undergo rigorous testing
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-green-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Truck className="h-8 w-8 text-green-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery to keep your operations running without interruption
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-purple-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Users className="h-8 w-8 text-purple-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Our technical team provides comprehensive support and consultation services
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-orange-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <Award className="h-8 w-8 text-orange-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Industry Leaders</h3>
              <p className="text-gray-600">
                Trusted by major industries worldwide for over 12 years of excellence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About Molytrix Petrochem
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Established in 2012 in Aragon, Spain. Molytrix Petrochem has built a strong reputation for innovation and quality in the lubricant industry. With over a decade of expertise, we are proud to announce our entry into the Indian market, bringing with us a new generation of advanced lubrication solutions. Our product portfolio includes cutting-edge Nano Greases, reliable General Purpose and Specialty Greases, and high-performance Gear Oils, Hydraulic Oils, and Engine Oils formulated with advanced European technology. Engineered to deliver superior protection, efficiency, and durability, Molytrix products are designed to meet the evolving needs of modern industries and machinery.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">12+ Years of Experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">500+ Satisfied Customers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Global Distribution Network</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3846574/pexels-photo-3846574.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Industrial facility"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
      
      {/**/}
      <div>
      {/* Your existing homepage content */}

      {/* Fixed Positioned Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <InsightButton />
      </div>
    </div>
    </section>

      {/* Distributor Section */}
 <div>
      <DistributorTable />
    </div>
      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600">
              Contact us today to discuss your lubrication needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 w-16 h-16 mx-auto mb-4">
                <Phone className="h-6 w-6 text-blue-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">+91 77589 36968</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-6 w-16 h-16 mx-auto mb-4">
                <Mail className="h-6 w-6 text-green-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">info@molytrixpetrochem.com <br/>
              sales@molytrixpetrochem.com </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-6 w-16 h-16 mx-auto mb-4">
                <MapPin className="h-6 w-6 text-purple-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-600">
                Regd.Office(India): 
                138/A/1/12, Nakshatra, Rajbag Colony Warnali, Sangli,Maharashtra, India-416416
                <br />
                Plant Address: 
                Avda.de Ranillas, 3A, 50018,Zaragoza Aragon, Spain 11600
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;