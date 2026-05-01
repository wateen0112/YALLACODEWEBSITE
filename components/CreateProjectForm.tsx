'use client';

import { useState } from 'react';
import { createProjectWithImage } from '@/lib/projects-api';

interface ProjectFormData {
  title: string;
  shortDescription: string;
  longDescription: string;
  technologies: string;
  demoLink: string;
  image: File | null;
}

export default function CreateProjectForm() {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    shortDescription: '',
    longDescription: '',
    technologies: '',
    demoLink: '',
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Validate required fields
      if (!formData.image) {
        throw new Error('Please select an image');
      }
      if (!formData.title || !formData.shortDescription || !formData.longDescription) {
        throw new Error('Please fill in all required fields');
      }

      // Create FormData for multipart upload
      const submitData = new FormData();
      submitData.append('image', formData.image);
      submitData.append('title', formData.title);
      submitData.append('shortDescription', formData.shortDescription);
      submitData.append('longDescription', formData.longDescription);
      submitData.append('technologies', formData.technologies);
      submitData.append('demoLink', formData.demoLink);

      await createProjectWithImage(submitData);
      setSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        shortDescription: '',
        longDescription: '',
        technologies: '',
        demoLink: '',
        image: null,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Project</h1>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Project created successfully!
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Image *
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          {formData.image && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {formData.image.name}
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter project title"
            required
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Description *
          </label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
            placeholder="Brief project description"
            required
          />
        </div>

        {/* Long Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Long Description *
          </label>
          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={5}
            placeholder="Detailed project description"
            required
          />
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Technologies *
          </label>
          <input
            type="text"
            name="technologies"
            value={formData.technologies}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="React, Node.js, MongoDB (comma-separated)"
            required
          />
        </div>

        {/* Demo Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Demo Link *
          </label>
          <input
            type="url"
            name="demoLink"
            value={formData.demoLink}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="https://example.com"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Creating Project...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
}
