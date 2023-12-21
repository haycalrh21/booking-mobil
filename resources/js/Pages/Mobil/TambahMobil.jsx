    import React, { useState } from 'react';
        import { Inertia } from '@inertiajs/inertia';
    import { Navbar } from '@/Pages/admin/Navbar';
    // import { Sidebar } from '@/Pages/admin/Sidebar';

    function TambahMobil() {
    // State untuk menyimpan data form
    const [formData, setFormData] = useState({
        nama: '',
        brand: '',
        harga: '',
        tahun: '',
        stok:'1',
        pajak: '', // Mengganti string menjadi empty string
        deskripsi: '',
        image: [], // Menambah state untuk gambar
        kategori: '', // Menambah state untuk kategori mobil
    });

    // Fungsi untuk menangani perubahan input form
    const handleInputChange = (e) => {
        const { name, type } = e.target;

        // Check if it's a file input and handle multiple files
        if (type === 'file') {
            const files = Array.from(e.target.files);
            setFormData({
                ...formData,
                [name]: files,
            });
        } else {
            const { value } = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };


    // Fungsi untuk menangani pengiriman form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataObj = new FormData();

            // Append other form data fields
            Object.keys(formData).forEach((key) => {
                if (key === 'images') {
                    // Handle multiple file uploads
                    formData[key].forEach((file, index) => {
                        formDataObj.append(`${key}[${index}]`, file);
                    });
                } else {
                    formDataObj.append(key, formData[key]);
                }
            });

            const response = await Inertia.post('/admin/mobil', formDataObj);

            // Rest of the code...
        } catch (error) {
            // Handle errors...
        }
    };



    return (
        <div>
        <Navbar />
        <div className="flex" style={{backgroundColor:'',color:'#00000A'}}>
      <img src="/images/bgputihkebalik.jpg" style={{ minWidth:'100%',maxHeight:'200%', position:'absolute', position:'absolute',zIndex:'-15'}} alt="" />

            <div className="w-1/1">
            {/* <Sidebar /> */}
            </div>
            <div className=" p-8 rounded-lg w-full flex flex-wrap">
            <div className="w-full md:container md:mx-auto">
                <h2 className="text-3xl font-semibold mb-2 mt-2 ">Tambah Data Mobil</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-yellow-600 mb-2">Nama:</label>
                    <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded border text-gray-700" required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-yellow-600 mb-2">Brand:</label>
                    <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded border text-gray-700" required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-yellow-600 mb-2">Harga:</label>
                    <input
                    type="text"
                    name="harga"
                    value={formData.harga}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded border text-gray-700" required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-yellow-600 mb-2">Stok bertambah 1:</label>
                    <input

                    type="hidden"
                    name="stok"
                    value={formData.stok}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded border text-gray-700" required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-yellow-600 mb-2">Tahun:</label>
                    <input
                    type="text"
                    name="tahun"
                    value={formData.tahun}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded border text-gray-700" required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-yellow-600 mb-2">Pajak:</label>
                    <div>
                    <input
                        type="radio"
                        name="pajak"
                        value="Hidup"
                        checked={formData.pajak === 'Hidup'}
                        onChange={handleInputChange} required
                    />
                    <label className="ml-2 text-yellow-600">Hidup</label>
                    </div>
                    <div>
                    <input
                        type="radio"
                        name="pajak"
                        value="Mati"
                        checked={formData.pajak === 'Mati'}
                        onChange={handleInputChange} required
                    />
                    <label className="ml-2 text-yellow-600">Mati</label>
                    </div>

                </div>
                <div className="mb-4">
                    <label className="block text-yellow-600 mb-2">Deskripsi:</label>
                    <textarea
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded border text-gray-700"
                    style={{ resize: 'vertical' }} required
                    />
                </div>
                <div className="mb-4">
    <label className="block text-yellow-600 mb-2">Gambar:</label>
    <span className='glass text-sm rounded-md bg-gradient-to-r from-green-200 to-blue-500 '>Bisa Memuat Lebih Dari 1 Gambar</span>
    <input
        type="file"
        name="images"
        onChange={handleInputChange}
        className="w-full px-3 py-2 rounded border text-ghost input-ghost glass"
        multiple  required
    />
</div>

                <div className="mb-4">
                    <label className="block text-yellow-600 mb-2">Kategori:</label>
                    <select
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded border text-gray-700" required
                    >
                    <option value="Sedan">--Silahkan Pilih--</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Pick-up">Pick-up</option>
                    <option value="Sport">Sport</option>
                    <option value="Listrik">Listrik</option>
                    <option value="Keluarga">Keluarga</option>
                    <option value="Klasik">Klasik</option>
                    <option value="Off-road">Off-road</option>
                    </select>
                </div>
                <div className="mb-4">
                    <button type="submit" className="btn bg-blue-500 glass text-white btn-success">
                    Simpan
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    );

    }
    export default TambahMobil;
