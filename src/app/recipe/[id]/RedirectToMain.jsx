"use client";
import { useEffect } from "react";

export default function RedirectToMain({ id }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = `https://rater-joes.vercel.app/recipes/${id}`;
    }, 4000);
    return () => clearTimeout(timer);
  }, [id]);
  return null;
} 