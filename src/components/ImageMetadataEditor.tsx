"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Save, X, AlertCircle } from "lucide-react";
import { FURNITURE_CATEGORIES } from "@/lib/categories";

interface ImageMetadataEditorProps {
  image: Doc<"images">;
  onClose: () => void;
}

export function ImageMetadataEditor({
  image,
  onClose,
}: ImageMetadataEditorProps) {
  const [formData, setFormData] = useState({
    title: image.title ?? "",
    category: image.category ?? "",
    description: image.description ?? "",
    year: image.year ?? new Date().getFullYear(),
    materials: image.materials?.join(", ") ?? "",
    isFeatured: image.isFeatured ?? false,
  });

  const updateImage = useMutation(api.images.updateImageMetadata);
  const [confirmSlugChange, setConfirmSlugChange] = useState(false);
  const featuredImages = useQuery(api.images.getFeaturedImages);
  const [featuredCount, setFeaturedCount] = useState(0);
  const [canBeFeatured, setCanBeFeatured] = useState(true);

  // Check if we can set this image as featured
  useEffect(() => {
    if (featuredImages) {
      const currentFeaturedCount = featuredImages.length;
      setFeaturedCount(currentFeaturedCount);

      // If this image is already featured, it can always be featured
      if (image.isFeatured) {
        setCanBeFeatured(true);
      } else {
        // If this image is not featured, check if we can add it (max 4)
        setCanBeFeatured(currentFeaturedCount < 4);
      }
    }
  }, [featuredImages, image.isFeatured]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate featured images limit
    if (formData.isFeatured && !canBeFeatured) {
      alert(
        "Максималният брой избрани творения е 4. Моля, премахнете друго избрано творение преди да добавите това.",
      );
      return;
    }

    try {
      await updateImage({
        id: image._id,
        title: formData.title.trim(),
        confirmSlugChange: confirmSlugChange || undefined,
        category: formData.category || undefined,
        description: formData.description || undefined,
        year: formData.year,
        materials: formData.materials
          ? formData.materials
              .split(",")
              .map((m) => m.trim())
              .filter(Boolean)
          : undefined,
        isFeatured: formData.isFeatured,
      });

      onClose();
    } catch (error) {
      console.error("Error updating image metadata:", error);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Редактиране на метаданни
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Име на продукт</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Например: Кухненски шкаф с масивен плот"
              required
            />
            <div className="mt-2 text-xs text-gray-500">
              Промяната на името може да промени адреса на страницата на
              продукта. Отметнете „Промени адреса (slug)“ ако желаете нов адрес.
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <Switch
                id="confirmSlugChange"
                checked={confirmSlugChange}
                onCheckedChange={setConfirmSlugChange}
              />
              <Label htmlFor="confirmSlugChange">Промени адреса (slug)</Label>
            </div>
          </div>
          <div>
            <Label htmlFor="category">Категория</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Изберете категория..." />
              </SelectTrigger>
              <SelectContent>
                {FURNITURE_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Описание на проекта..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="year">Година</Label>
            <Input
              id="year"
              type="number"
              value={formData.year}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  year: parseInt(e.target.value) || new Date().getFullYear(),
                }))
              }
              min="2000"
              max={new Date().getFullYear() + 1}
            />
          </div>

          <div>
            <Label htmlFor="materials">Материали (разделени със запетая)</Label>
            <Input
              id="materials"
              value={formData.materials}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, materials: e.target.value }))
              }
              placeholder="Например: Дъб, Стекло, Метал..."
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="isFeatured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isFeatured: checked }))
                }
                disabled={!canBeFeatured && !formData.isFeatured}
              />
              <Label htmlFor="isFeatured">Показване в избрани творения</Label>
            </div>

            {featuredImages && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <AlertCircle className="h-4 w-4" />
                <span>
                  Избрани творения: {featuredCount}/4
                  {!canBeFeatured && !formData.isFeatured && (
                    <span className="ml-2 font-medium text-red-600">
                      (Достигнат максимум)
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Отказ
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Запази
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
