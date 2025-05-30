import { getIndexData } from "../services/services.js";

export const getIndex = async (req, res) => {
    const data = await getIndexData();
  res.render("pages/index", {indexData: data});
};