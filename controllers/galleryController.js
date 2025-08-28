import Gallery from "../models/gallery.js";

export async function addGalleryItem(req, res) {
  try {
    if (req.user == null || req.user.role !== "admin") {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    const { imageUrl, description } = req.body;
    if (!imageUrl || !description) {
      res.status(400).json({ message: "imageUrl and description are required" });
      return;
    }

    const item = new Gallery({ imageUrl, description });
    await item.save();
    res.status(201).json({ message: "Gallery item created", item });
  } catch (e) {
    res.status(500).json({ message: "Failed to create gallery item" });
  }
}

export async function listGallery(req, res) {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.max(parseInt(req.query.limit || '20', 10), 1);
    const total = await Gallery.countDocuments();
    const items = await Gallery.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      data: items,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    });
  } catch (e) {
    res.status(500).json({ message: "Failed to list gallery" });
  }
}

export async function deleteGalleryItem(req, res) {
  try {
    if (req.user == null || req.user.role !== "admin") {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }
    const id = req.params.id;
    await Gallery.deleteOne({ _id: id });
    res.json({ message: "Gallery item deleted" });
  } catch (e) {
    res.status(500).json({ message: "Failed to delete gallery item" });
  }
}



