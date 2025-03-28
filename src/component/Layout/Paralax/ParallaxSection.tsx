// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   resetParallaxSection,
//   setParallaxSection,
// } from "@/redux/features/layout/layoutSlice";
// import { useAppSelector } from "@/redux/hook";
// import Image from "next/image";
// import React, { useState, useRef } from "react";
// import { useDispatch } from "react-redux";

// const ParallaxSection = () => {
//   const dispatch = useDispatch();
//   const { parallaxSection } = useAppSelector((state) => state.layout);
//   const [sections, setSections] = useState(() => {
//     return parallaxSection?.sections || [];
//   });

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleImageUpload = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const imageUrl = URL.createObjectURL(file);

//       setSections((prev) => {
//         const updated = [...prev];
//         updated[index] = {
//           ...updated[index],
//           backgroundImage: imageUrl,
//         };
//         return updated;
//       });
//     }
//   };

//   const updateSection = (index: number, field: string, value: string) => {
//     const updated = [...sections];
//     updated[index] = { ...updated[index], [field]: value };
//     setSections(updated);
//   };

//   const updateStyle = (
//     index: number,
//     element: keyof (typeof sections)[0]["styles"], // This is the key change
//     field: string,
//     value: string
//   ) => {
//     const updated = [...sections];
//     updated[index] = {
//       ...updated[index],
//       styles: {
//         ...updated[index].styles,
//         [element]: {
//           ...(updated[index].styles as any)[element],
//           [field]: value,
//         },
//       },
//     };
//     setSections(updated);
//   };

//   const handleSave = () => {
//     dispatch(setParallaxSection({ sections }));
//   };

//   const handleReset = () => {
//     dispatch(resetParallaxSection());
//     setSections(parallaxSection.sections);
//   };

//   return (
//     <div className="w-full">
//       <div className="flex justify-between mb-6">
//         <h2 className="text-xl font-semibold text-gray-700">
//           Parallax Section Configuration
//         </h2>
//         <div className="flex gap-2">
//           <Button onClick={handleSave}>Save Configuration</Button>
//           <Button variant="outline" onClick={handleReset}>
//             Reset
//           </Button>
//         </div>
//       </div>

//       {sections.map((section, index) => (
//         <div key={index} className="mb-8 p-4 border rounded-lg">
//           <h3 className="text-lg font-medium mb-4">Section {index + 1}</h3>

//           {/* Background Image Upload */}
//           <div className="mb-6">
//             <label className="block mb-2">Background Image</label>
//             <div className="flex items-center gap-4">
//               {section.backgroundImage && (
//                 <div className="relative w-24 h-24 rounded-md overflow-hidden border">
//                   <Image
//                     src={section.backgroundImage}
//                     fill
//                     alt="Background preview"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               )}
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={(e) => handleImageUpload(e, index)}
//                 accept="image/*"
//                 className="hidden"
//               />
//               <Button
//                 variant="outline"
//                 onClick={() => fileInputRef.current?.click()}
//               >
//                 {section.backgroundImage ? "Change Image" : "Upload Image"}
//               </Button>
//             </div>
//           </div>

//           {/* Overlay Color */}
//           <div className="mb-4">
//             <label className="block mb-2">Overlay Color</label>
//             <div className="flex gap-2">
//               <input
//                 type="color"
//                 value={section.overlayColor}
//                 onChange={(e) =>
//                   updateSection(index, "overlayColor", e.target.value)
//                 }
//                 className="w-10 h-10"
//               />
//               <input
//                 value={section.overlayColor}
//                 onChange={(e) =>
//                   updateSection(index, "overlayColor", e.target.value)
//                 }
//                 className="w-40 p-2 border rounded"
//               />
//             </div>
//           </div>

//           {/* Content Configuration */}
//           <div className="space-y-4 mb-4">
//             <div>
//               <label className="block mb-2">Title</label>
//               <input
//                 value={section.title}
//                 onChange={(e) => updateSection(index, "title", e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Subtitle</label>
//               <input
//                 value={section.subtitle}
//                 onChange={(e) =>
//                   updateSection(index, "subtitle", e.target.value)
//                 }
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block mb-2">Button Text</label>
//                 <input
//                   value={section.buttonText}
//                   onChange={(e) =>
//                     updateSection(index, "buttonText", e.target.value)
//                   }
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-2">Button Link</label>
//                 <input
//                   value={section.buttonLink}
//                   onChange={(e) =>
//                     updateSection(index, "buttonLink", e.target.value)
//                   }
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Styling Options */}
//           <div className="space-y-4">
//             <h4 className="font-medium">Styling Options</h4>

//             {/* Title Styles */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block mb-1">Title Color</label>
//                 <input
//                   type="color"
//                   value={section.styles.title.color}
//                   onChange={(e) =>
//                     updateStyle(index, "title", "color", e.target.value)
//                   }
//                   className="w-full h-10"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Title Font Size</label>
//                 <input
//                   value={section.styles.title.fontSize}
//                   onChange={(e) =>
//                     updateStyle(index, "title", "fontSize", e.target.value)
//                   }
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//             </div>

//             {/* Add similar styling controls for other elements */}
//           </div>
//         </div>
//       ))}

//       <Button
//         onClick={() => setSections([...sections, { ...sections[0] }])}
//         className="w-full mt-4"
//         variant="outline"
//       >
//         Add New Parallax Section
//       </Button>
//     </div>
//   );
// };

// export default ParallaxSection;
