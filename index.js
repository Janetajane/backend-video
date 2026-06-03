const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/api/generate-video', upload.array('images', 2), async (req, res) => {
    try {
        const { ratio, quality, apiKey } = req.body;
        const files = req.files;

        if (!apiKey) {
            return res.status(400).json({ success: false, error: "API Key tidak boleh kosong!" });
        }
        if (!files || files.length === 0) {
            return res.status(400).json({ success: false, error: "Gambar harus diupload!" });
        }

        const censoredKey = apiKey.substring(0, 6) + "**********";
        console.log(`Menerima Request dengan API Key: ${censoredKey}`);

        // Di sinilah nanti logika API Leonardo AI diletakkan
        
        res.json({
            success: true,
            message: "Permintaan berhasil diterima oleh server Railway",
            api_used: censoredKey,
            data: { ratio, quality, status: "PROCESSING" }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Terjadi kesalahan server backend" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
