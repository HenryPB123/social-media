export const uploadFiles = (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
};
