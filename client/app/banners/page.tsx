"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Plus, Trash2, Pencil, Image as ImageIcon, Search } from "lucide-react";
import { motion } from "framer-motion";

type BannerType = {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  status: string;
};

export default function BannerManagement() {

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [banner, setBanner] = useState<BannerType>({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    image: "",
    status: "Active"
  });

  const [banners, setBanners] = useState<BannerType[]>([]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setBanner(prev => ({
        ...prev,
        image: reader.result as string
      }));
    };

    reader.readAsDataURL(file);
  };

  const saveBanner = () => {

    if (!banner.title || !banner.image) {
      alert("Title and image required");
      return;
    }

    if (editIndex !== null) {
      const updated = [...banners];
      updated[editIndex] = banner;
      setBanners(updated);
      setEditIndex(null);
    } else {
      setBanners([...banners, banner]);
    }

    setBanner({
      title: "",
      subtitle: "",
      buttonText: "",
      buttonLink: "",
      image: "",
      status: "Active"
    });

    setShowModal(false);
  };

  const deleteBanner = (index: number) => {
    setBanners(banners.filter((_, i) => i !== index));
  };

  const editBanner = (index: number) => {
    setBanner(banners[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const filtered = banners.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Header />

        <div className="p-8">

          {/* Top Section */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

            <h1 className="text-3xl font-bold text-black">
              Banner Management
            </h1>

            <div className="flex gap-3">

              {/* Search */}

              <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm">

                <Search size={18} className="text-black" />

                <input
                  type="text"
                  placeholder="Search banner..."
                  className="ml-2 outline-none text-black placeholder-black"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

              </div>

              {/* Add Button */}

              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
              >
                <Plus size={18} />
                Add Banner
              </button>

            </div>

          </div>

          {/* Banner Grid */}

          {filtered.length === 0 ? (

            <div className="text-center py-20 text-black text-lg">
              No banners added yet
            </div>

          ) : (

            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {filtered.map((banner, index) => (

                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border"
                >

                  <div className="h-52 bg-gray-200">

                    {banner.image && (

                      <img
                        src={banner.image}
                        className="w-full h-full object-cover"
                        alt="banner"
                      />

                    )}

                  </div>

                  <div className="p-5">

                    <h3 className="text-lg font-bold text-black">
                      {banner.title}
                    </h3>

                    <p className="text-black mt-1">
                      {banner.subtitle}
                    </p>

                    <div className="flex justify-between items-center mt-4">

                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          banner.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {banner.status}
                      </span>

                      <div className="flex gap-3">

                        <button
                          onClick={() => editBanner(index)}
                          className="text-blue-600"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => deleteBanner(index)}
                          className="text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </div>

                  </div>

                </motion.div>

              ))}

            </div>

          )}

        </div>

      </div>

      {/* Modal */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">

            <h2 className="text-xl font-bold mb-5 text-black">
              {editIndex !== null ? "Edit Banner" : "Add Banner"}
            </h2>

            <div className="space-y-4">

              <input
                placeholder="Banner Title"
                className="w-full border rounded-lg p-3 text-black placeholder-black"
                value={banner.title}
                onChange={(e) =>
                  setBanner({ ...banner, title: e.target.value })
                }
              />

              <input
                placeholder="Subtitle"
                className="w-full border rounded-lg p-3 text-black placeholder-black"
                value={banner.subtitle}
                onChange={(e) =>
                  setBanner({ ...banner, subtitle: e.target.value })
                }
              />

              <input
                placeholder="Button Text"
                className="w-full border rounded-lg p-3 text-black placeholder-black"
                value={banner.buttonText}
                onChange={(e) =>
                  setBanner({ ...banner, buttonText: e.target.value })
                }
              />

              <input
                placeholder="Button Link"
                className="w-full border rounded-lg p-3 text-black placeholder-black"
                value={banner.buttonLink}
                onChange={(e) =>
                  setBanner({ ...banner, buttonLink: e.target.value })
                }
              />

              <select
                className="w-full border rounded-lg p-3 text-black"
                value={banner.status}
                onChange={(e) =>
                  setBanner({ ...banner, status: e.target.value })
                }
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              {/* Upload */}

              <label className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer block">

                <ImageIcon className="mx-auto mb-2 text-black" />

                <p className="text-black">
                  Click to upload banner image
                </p>

                <input
                  type="file"
                  className="hidden"
                  onChange={handleImage}
                />

              </label>

              {banner.image && (

                <img
                  src={banner.image}
                  className="w-full h-40 object-cover rounded-lg"
                  alt="preview"
                />

              )}

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border text-black"
              >
                Cancel
              </button>

              <button
                onClick={saveBanner}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Save Banner
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}