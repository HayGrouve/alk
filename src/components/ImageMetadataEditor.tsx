"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Save, X } from "lucide-react";

interface ImageMetadataEditorProps {
  image: Doc<"images">;
  onClose: () => void;
}

export function ImageMetadataEditor({
  image,
  onClose,
}: ImageMetadataEditorProps) {
  const [formData, setFormData] = useState({
    category: image.category ?? "",
    description: image.description ?? "",
    year: image.year ?? new Date().getFullYear(),
    materials: image.materials?.join(", ") ?? "",
    isFeatured: image.isFeatured ?? false,
  });

  const updateImage = useMutation(api.images.updateImageMetadata);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateImage({
        id: image._id,
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
            <Label htmlFor="category">Категория</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              placeholder="Например: Кухни, Спални, Хол..."
            />
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

          <div className="flex items-center space-x-2">
            <Switch
              id="isFeatured"
              checked={formData.isFeatured}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, isFeatured: checked }))
              }
            />
            <Label htmlFor="isFeatured">Показване в избрани творения</Label>
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
