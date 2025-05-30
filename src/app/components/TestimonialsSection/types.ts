export interface TestimonialAuthorData {
  name: string;
  title: string; // e.g., "Evergreen Landscapes"
  avatarSrc: string; // Path to the image file in /public/images/testimonials/
}

export interface TestimonialData {
  id: string; // Unique identifier, useful for keys in lists
  quote: string;
  author: TestimonialAuthorData;
} 