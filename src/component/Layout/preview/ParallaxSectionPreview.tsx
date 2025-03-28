// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React from "react";

// const ParallaxSectionPreview = ({ sections }: { sections: any[] }) => {
//    if (!sections || sections.length === 0) {
//     return (
//       <div className="text-center py-8 text-gray-500">
//         No parallax sections configured yet
//       </div>
//     );
//   }
//   return (
//     <div className="w-full">
//       {sections.map((section, index) => (
//         <div
//           key={index}
//           className="relative flex items-center justify-center bg-cover bg-fixed bg-center"
//           style={{
//             height: section.styles.container.height,
//             padding: section.styles.container.padding,
//             backgroundImage: `url(${section.backgroundImage})`,
//           }}
//         >
//           {/* Overlay */}
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundColor: section.overlayColor,
//             }}
//           />

//           {/* Content */}
//           <div
//             className="relative z-10"
//             style={{
//               maxWidth: section.styles.content.maxWidth,
//               textAlign: section.styles.content.textAlign as any,
//             }}
//           >
//             <h2
//               style={{
//                 color: section.styles.title.color,
//                 fontSize: section.styles.title.fontSize,
//                 fontWeight: section.styles.title.fontWeight,
//                 marginBottom: section.styles.title.marginBottom,
//               }}
//             >
//               {section.title}
//             </h2>
//             {section.subtitle && (
//               <h3
//                 style={{
//                   color: section.styles.subtitle.color,
//                   fontSize: section.styles.subtitle.fontSize,
//                   fontWeight: section.styles.subtitle.fontWeight,
//                   marginBottom: section.styles.subtitle.marginBottom,
//                 }}
//               >
//                 {section.subtitle}
//               </h3>
//             )}
//             {section.buttonText && (
//               <button
//                 style={{
//                   backgroundColor: section.styles.button.backgroundColor,
//                   color: section.styles.button.color,
//                   padding: section.styles.button.padding,
//                   borderRadius: section.styles.button.borderRadius,
//                   fontSize: section.styles.button.fontSize,
//                   fontWeight: section.styles.button.fontWeight,
//                 }}
//                 className="hover:opacity-90 transition-opacity"
//               >
//                 {section.buttonText}
//               </button>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ParallaxSectionPreview;
