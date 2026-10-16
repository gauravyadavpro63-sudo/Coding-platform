
import { useState } from "react";
import {
  uploadVideoToCloudinary,
  saveVideoMetadata,
} from "../api/video";

function VideoUpload() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  async function handleUpload(e) {
    e.preventDefault();
    setMessage("");

    if (!title.trim() || !file) {
      setMessage("Please enter a title and select a video.");
      return;
    }

    // Early client-side validation.
    if (file.size > 100 * 1024 * 1024) {
      setMessage("Video must be 100 MB or smaller.");
      return;
    }

    setLoading(true);

    try {
      // 1. Upload the actual file directly to Cloudinary.
      const cloudinaryData = await uploadVideoToCloudinary(
        file,
        setProgress
      );

      // 2. Ask the backend to verify the asset and save metadata.
      await saveVideoMetadata({
        title: title.trim(),
        ...cloudinaryData,
      });

      setMessage("Video uploaded and saved successfully!");
      setTitle("");
      setFile(null);
      setProgress(0);

      // Reset the actual file input as well.
      e.target.reset();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Video upload failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full justify-center items-center">
      <form
        onSubmit={handleUpload}
        className="flex w-full max-w-lg flex-col items-center space-y-4"
      >
        <input
          type="text"
          placeholder="Video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border p-3"
          maxLength={120}
          required
        />

        <input
          type="file"
          accept="video/mp4"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
            setMessage("");
            setProgress(0);
          }}
          className="w-full rounded-lg border border-dashed
            border-gray-300 file:mr-4 file:rounded-lg
            file:border-0 file:bg-orange-600 file:px-4
            file:py-2 file:text-white hover:file:bg-orange-700"
          required
        />

        {file && (
          <p className="text-sm text-gray-500">
            Selected: {file.name} (
            {(file.size / (1024 * 1024)).toFixed(2)} MB)
          </p>
        )}

        {loading && (
          <div className="w-full space-y-2">
            <div className="h-2 w-full overflow-hidden rounded bg-gray-200">
              <div
                className="h-full bg-orange-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">
              Uploading: {progress}%
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-orange-600 px-5 py-3
            text-white disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>

        {message && (
          <p role="status" aria-live="polite">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default VideoUpload;
