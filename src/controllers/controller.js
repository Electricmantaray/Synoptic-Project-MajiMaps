import { fetchWelcomeMessage } from "../services/services.js";

export const getIndex = (req, res) => {
  res.render("index");
};