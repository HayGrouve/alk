"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HealthData {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
}

export function MonitoringDashboard() {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const response = await fetch("/api/health");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = (await response.json()) as HealthData;
        setHealthData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    void fetchHealthData();

    // Refresh every 30 seconds
    const interval = setInterval(() => void fetchHealthData(), 30000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) {
      return `${days}д ${hours}ч ${minutes}м`;
    } else if (hours > 0) {
      return `${hours}ч ${minutes}м`;
    } else {
      return `${minutes}м`;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Мониторинг на системата</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            <span className="ml-2">Зареждане...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Мониторинг на системата</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-red-200 bg-red-50 p-4">
            <p className="text-red-600">
              Грешка при зареждане на данните: {error}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Мониторинг на системата</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Status */}
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Статус</p>
                <p
                  className={`text-lg font-semibold ${
                    healthData?.status === "healthy"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {healthData?.status === "healthy" ? "Здрав" : "Проблем"}
                </p>
              </div>
              <div
                className={`h-3 w-3 rounded-full ${
                  healthData?.status === "healthy"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />
            </div>
          </div>

          {/* Uptime */}
          <div className="rounded-lg border p-4">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Време на работа
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {healthData?.uptime ? formatUptime(healthData.uptime) : "N/A"}
              </p>
            </div>
          </div>

          {/* Environment */}
          <div className="rounded-lg border p-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Среда</p>
              <p className="text-lg font-semibold text-gray-900">
                {healthData?.environment ?? "N/A"}
              </p>
            </div>
          </div>

          {/* Version */}
          <div className="rounded-lg border p-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Версия</p>
              <p className="text-lg font-semibold text-gray-900">
                {healthData?.version ?? "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-4 text-sm text-gray-500">
          Последно обновено:{" "}
          {healthData?.timestamp
            ? new Date(healthData.timestamp).toLocaleString("bg-BG")
            : "N/A"}
        </div>
      </CardContent>
    </Card>
  );
}
