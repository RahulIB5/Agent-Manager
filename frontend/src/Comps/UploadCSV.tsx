"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import API from "../services/api"

export default function UploadCSV() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setError("")
    setSuccess(false)

    if (selectedFile) {
      const validTypes = [".csv", ".xlsx", ".xls"]
      const fileExtension = selectedFile.name.toLowerCase().substring(selectedFile.name.lastIndexOf("."))

      if (!validTypes.includes(fileExtension)) {
        setError("Please select a valid CSV, XLSX, or XLS file.")
        setFile(null)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setError("Please select a file to upload.")
      return
    }

    setLoading(true)
    setError("")
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append("file", file)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 200)

      await API.post("/lists/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      clearInterval(progressInterval)
      setUploadProgress(100)
      setSuccess(true)

      toast({
        title: "Success!",
        description: "File uploaded and distributed successfully.",
      })

      // Reset form after success
      setTimeout(() => {
        setFile(null)
        setSuccess(false)
        setUploadProgress(0)
        const fileInput = document.getElementById("file-upload") as HTMLInputElement
        if (fileInput) fileInput.value = ""
      }, 2000)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to upload and distribute file")
      setUploadProgress(0)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Upload CSV File</h2>
        <p className="text-muted-foreground">Upload a CSV file to distribute tasks among agents automatically.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            File Upload
          </CardTitle>
          <CardDescription>
            Select a CSV, XLSX, or XLS file containing FirstName, Phone, and Notes columns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>File uploaded and distributed successfully among agents!</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                  <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="font-semibold">Choose a file to upload</h3>
                  <p className="text-sm text-muted-foreground mb-4">CSV, XLSX, or XLS files up to 10MB</p>
                  <div className="relative">
                    <input
                      id="file-upload"
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button type="button" variant="outline">
                      Select File
                    </Button>
                  </div>
                </div>
              </div>

              {file && (
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{file.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              )}

              {loading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading and distributing...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={!file || loading} className="flex-1">
                {loading ? "Processing..." : "Upload & Distribute"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFile(null)
                  setError("")
                  setSuccess(false)
                  const fileInput = document.getElementById("file-upload") as HTMLInputElement
                  if (fileInput) fileInput.value = ""
                }}
              >
                Clear
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* File Format Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">File Format Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Required Columns:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>
                <strong>FirstName</strong> - Text field for the contact's first name
              </li>
              <li>
                <strong>Phone</strong> - Number field for the contact's phone number
              </li>
              <li>
                <strong>Notes</strong> - Text field for additional notes
              </li>
            </ul>
            <p className="mt-4 text-muted-foreground">
              The system will automatically distribute the uploaded data equally among all available agents.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
