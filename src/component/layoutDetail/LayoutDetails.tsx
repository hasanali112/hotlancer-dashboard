/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EyeIcon, Code, Layout, Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const LayoutDetails = ({ layout }: { layout: any }) => {
  // Get component keys for the tabs
  const getComponentKeys = () => {
    if (!layout) return [];
    return Object.keys(layout).filter(
      (key) =>
        key.includes("Component") ||
        key.includes("Section") ||
        key === "navComponent" ||
        key === "bannerComponent" ||
        key === "featuresComponent"
    );
  };

  // Format component name for display
  const formatComponentName = (key: any) => {
    return (
      key
        .replace("Component", "")
        .replace("Section", "")
        // Add space before capital letters and capitalize first letter
        .replace(/([A-Z])/g, " $1")
        .trim()
    );
  };

  // Render preview for navigation component
  const renderNavPreview = (navComponent: any) => {
    if (!navComponent) return null;

    return (
      <div
        className="p-4 mb-4 rounded"
        style={{
          backgroundColor: navComponent.colors?.backgroundColor || "#f0f4f8",
          color: navComponent.colors?.textColor || "#333333",
        }}
      >
        <div className="flex justify-between items-center">
          <div className="font-bold">
            {navComponent.brandType === "image" && navComponent.brandImage ? (
              <Image
                src={navComponent.brandImage}
                alt="Brand Logo"
                width={100}
                height={40}
                className="h-10 object-contain"
              />
            ) : (
              navComponent.brand
            )}
          </div>
          <div className="flex gap-4">
            {navComponent.items?.map((item: any, index: number) => (
              <div key={index}>{item.label}</div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render preview for banner component
  const renderBannerPreview = (bannerComponent: any) => {
    if (!bannerComponent) return null;

    return (
      <div
        className="p-4 mb-4 rounded"
        style={{
          backgroundColor: bannerComponent.colors?.backgroundColor || "#f0f4f8",
          color: bannerComponent.colors?.textColor || "#333333",
        }}
      >
        <div
          className={`flex ${
            bannerComponent.styles?.flexDirection === "flex-row"
              ? "flex-row"
              : "flex-col"
          } gap-6 items-center`}
        >
          <div>
            <h3
              className={`${
                bannerComponent.styles?.headingSize || "text-3xl"
              } ${bannerComponent.styles?.headingWeight || "font-bold"} ${
                bannerComponent.styles?.headingAlign || "text-center"
              }`}
            >
              {bannerComponent.heading}
            </h3>
            <p
              className={`${
                bannerComponent.styles?.contentSize || "text-base"
              } ${bannerComponent.styles?.contentAlign || "text-center"}`}
            >
              {bannerComponent.content}
            </p>
          </div>
          {bannerComponent.showImage && bannerComponent.imageUrl && (
            <div className="mt-2">
              <Image
                src={bannerComponent.imageUrl}
                alt="Banner"
                width={400}
                height={200}
                className="w-full h-32 object-cover rounded"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render preview for features component
  const renderFeaturesPreview = (featuresComponent: any) => {
    if (!featuresComponent) return null;

    // Handle array format (Layout Two format)
    if (Array.isArray(featuresComponent)) {
      return (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {featuresComponent.slice(0, 4).map((feature: any, index: number) => (
            <div
              key={index}
              className={`p-4 rounded ${feature.borderWidth || "border"} ${
                feature.borderRadius || "rounded"
              }`}
              style={{
                backgroundColor: feature.backgroundColor || "#ffffff",
                color: feature.textColor || "#333333",
                borderColor: feature.borderColor || "#e2e8f0",
              }}
            >
              <div
                className={`flex ${feature.flexDirection || "flex-col"} ${
                  feature.justifyContent || "justify-center"
                } ${feature.alignItems || "items-center"} ${
                  feature.gap || "gap-4"
                }`}
              >
                <div className="text-2xl">{feature.icon || "🚀"}</div>
                <div>
                  <h4
                    className={`${feature.titleSize || "text-xl"} ${
                      feature.titleWeight || "font-bold"
                    }`}
                  >
                    {feature.title || "Feature Title"}
                  </h4>
                  <p className={`${feature.descriptionSize || "text-base"}`}>
                    {feature.description?.substring(0, 50) ||
                      "Feature description goes here..."}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Handle object with cards format (Layout One format)
    if (featuresComponent.cards) {
      return (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {featuresComponent.cards
            .slice(0, 4)
            .map((card: any, index: number) => (
              <div
                key={index}
                className={`p-4 rounded ${
                  card.styles?.card?.borderWidth || "border"
                } ${card.styles?.card?.borderRadius || "rounded"}`}
                style={{
                  backgroundColor:
                    card.styles?.card?.backgroundColor || "#ffffff",
                  color: card.styles?.title?.color || "#333333",
                  borderColor: card.styles?.card?.borderColor || "#e2e8f0",
                }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="text-2xl">{card.icon || "🚀"}</div>
                  <h4
                    className={`${card.styles?.title?.fontSize || "text-xl"} ${
                      card.styles?.title?.fontWeight || "font-bold"
                    }`}
                  >
                    {card.title || "Feature Title"}
                  </h4>
                  <p
                    className={`${
                      card.styles?.description?.fontSize || "text-base"
                    }`}
                  >
                    {card.description?.substring(0, 50) ||
                      "Feature description goes here..."}
                  </p>
                </div>
              </div>
            ))}
        </div>
      );
    }

    return null;
  };

  // Render preview for descriptive section
  const renderDescriptiveSection = (section: any) => {
    if (!section) return null;

    return (
      <div
        className="p-4 mb-4 rounded"
        style={{
          backgroundColor: section.backgroundColor || "#ffffff",
          color: section.textColor || "#333333",
        }}
      >
        <div
          className={`flex flex-col ${
            section.alignment === "left" ? "items-start" : "items-center"
          } gap-4`}
        >
          {section.images?.[0] && (
            <Image
              src={section.images[0]}
              alt="Descriptive section"
              width={400}
              height={300}
              className="w-full h-48 object-cover rounded"
            />
          )}
          <h3 className="text-2xl font-bold">{section.heading}</h3>
          {section.subheading && (
            <h4 className="text-xl">{section.subheading}</h4>
          )}
          <p>{section.description}</p>
        </div>
      </div>
    );
  };

  // Render preview for parallax section
  const renderParallaxSection = (section: any) => {
    if (!section) return null;

    return (
      <div
        className="relative mb-4 rounded overflow-hidden"
        style={{
          height: section.height || "400px",
        }}
      >
        {section.image && (
          <Image
            src={section.image}
            alt="Parallax background"
            fill
            className="object-cover"
          />
        )}
        <div
          className="absolute inset-0 flex items-center justify-center p-4"
          style={{
            backgroundColor: section.overlayColor || "rgba(0,0,0,0.5)",
            color: section.textColor || "#ffffff",
            textAlign: section.textAlignment || "center",
          }}
        >
          <div>
            <h3 className="text-3xl font-bold">{section.heading}</h3>
            {section.subheading && (
              <h4 className="text-xl">{section.subheading}</h4>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render preview for form section
  const renderFormSection = (section: any) => {
    if (!section) return null;

    return (
      <div
        className="p-4 mb-4 rounded"
        style={{
          backgroundColor: section.styles?.bgColor || "#ffffff",
          color: section.styles?.textColor || "#333333",
          padding: section.styles?.padding || "1.5rem",
          borderRadius: section.styles?.borderRadius || "0.5rem",
        }}
      >
        <h3 className="text-xl font-bold mb-4">Contact Form</h3>
        {section.fields?.slice(0, 2).map((field: any) => (
          <div key={field.id} className="mb-4">
            <label className="block mb-1">{field.label}</label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              className="w-full p-2 border rounded"
              style={{
                backgroundColor: field.styles?.bgColor || "#ffffff",
                borderColor: field.styles?.borderColor || "#d1d5db",
              }}
            />
          </div>
        ))}
        <button
          className="px-4 py-2 rounded"
          style={{
            backgroundColor: section.styles?.buttonBgColor || "#3b82f6",
            color: section.styles?.buttonTextColor || "#ffffff",
          }}
        >
          {section.submitText || "Submit"}
        </button>
      </div>
    );
  };

  // Render preview for FAQ section
  const renderFaqSection = (section: any) => {
    if (!section) return null;

    return (
      <div
        className="p-4 mb-4 rounded"
        style={{
          backgroundColor: section.styles?.bgColor || "#ffffff",
          padding: section.styles?.padding || "1.5rem",
          borderRadius: section.styles?.borderRadius || "0.5rem",
        }}
      >
        <h3 className="text-xl font-bold mb-4">FAQs</h3>
        {section.items?.slice(0, 2).map((item: any) => (
          <div key={item.id} className="mb-4">
            <h4
              className="font-semibold mb-1"
              style={{
                color: item.styles?.questionColor || "#1a1a1a",
                fontSize: item.styles?.questionFontSize || "1.125rem",
              }}
            >
              {item.question}
            </h4>
            <p
              style={{
                color: item.styles?.answerColor || "#4a5568",
                fontSize: item.styles?.answerFontSize || "1rem",
              }}
            >
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    );
  };

  // Render preview for footer section
  const renderFooterSection = (section: any) => {
    if (!section) return null;

    return (
      <div
        className="p-4 rounded"
        style={{
          backgroundColor: section.styles?.bgColor || "#1e293b",
          color: section.styles?.textColor || "#e2e8f0",
          padding: section.styles?.padding || "2rem",
        }}
      >
        <div className="flex justify-between items-center">
          <div>
            {section.logo?.image ? (
              <Image
                src={section.logo.image}
                alt="Logo"
                width={120}
                height={40}
              />
            ) : (
              <div>
                <div
                  className="text-xl font-bold"
                  style={{ color: section.styles?.headingColor || "#ffffff" }}
                >
                  {section.logo?.text || "My Site"}
                </div>
                {section.logo?.subtext && (
                  <div className="text-sm">{section.logo.subtext}</div>
                )}
              </div>
            )}
          </div>
          {section.socialLinks && (
            <div className="flex gap-4">
              {section.socialLinks.map((link: any) => (
                <div key={link.id} className="text-xl">
                  {link.platform === "facebook" && "📘"}
                  {link.platform === "twitter" && "🐦"}
                  {link.platform === "instagram" && "📷"}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <EyeIcon className="h-4 w-4 mr-2" /> View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {layout?.layoutName || "Layout Details"}
          </DialogTitle>
          <DialogDescription>
            Detailed information about this layout and its components.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Layout Components:</h3>
            <div className="flex flex-wrap gap-2">
              {getComponentKeys().map((key) => (
                <Badge key={key} variant="secondary">
                  {formatComponentName(key)}
                </Badge>
              ))}
            </div>
          </div>

          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="preview" className="flex-1">
                <EyeIcon className="h-4 w-4 mr-2" /> Preview
              </TabsTrigger>
              <TabsTrigger value="structure" className="flex-1">
                <Layout className="h-4 w-4 mr-2" /> Structure
              </TabsTrigger>
              <TabsTrigger value="code" className="flex-1">
                <Code className="h-4 w-4 mr-2" /> JSON
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="min-h-[300px]">
              <Card>
                <CardContent className="p-4">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Palette className="h-4 w-4 mr-1" /> Visual Preview
                  </h4>

                  {/* Navigation Component Preview */}
                  {layout.navComponent && (
                    <>
                      <div className="text-xs text-muted-foreground mb-1">
                        Navigation
                      </div>
                      {renderNavPreview(layout.navComponent)}
                    </>
                  )}

                  {/* Banner Component Preview */}
                  {layout.bannerComponent && (
                    <>
                      <div className="text-xs text-muted-foreground mb-1">
                        Banner
                      </div>
                      {renderBannerPreview(layout.bannerComponent)}
                    </>
                  )}

                  {/* Features Component Preview */}
                  {layout.featuresComponent && (
                    <>
                      <div className="text-xs text-muted-foreground mb-1">
                        Features
                      </div>
                      {renderFeaturesPreview(layout.featuresComponent)}
                    </>
                  )}

                  {/* Descriptive Section Preview */}
                  {layout.descriptiveSection && (
                    <>
                      <div className="text-xs text-muted-foreground mb-1">
                        Descriptive Section
                      </div>
                      {renderDescriptiveSection(layout.descriptiveSection)}
                    </>
                  )}

                  {/* Parallax Section Preview */}
                  {layout.parallaxSection && (
                    <>
                      <div className="text-xs text-muted-foreground mb-1">
                        Parallax Section
                      </div>
                      {renderParallaxSection(layout.parallaxSection)}
                    </>
                  )}

                  {/* Form Section Preview */}
                  {layout.formSection && (
                    <>
                      <div className="text-xs text-muted-foreground mb-1">
                        Form Section
                      </div>
                      {renderFormSection(layout.formSection)}
                    </>
                  )}

                  {/* FAQ Section Preview */}
                  {layout.faqSection && (
                    <>
                      <div className="text-xs text-muted-foreground mb-1">
                        FAQ Section
                      </div>
                      {renderFaqSection(layout.faqSection)}
                    </>
                  )}

                  {/* Footer Section Preview */}
                  {layout.footerSection && (
                    <>
                      <div className="text-xs text-muted-foreground mb-1">
                        Footer Section
                      </div>
                      {renderFooterSection(layout.footerSection)}
                    </>
                  )}

                  <div className="mt-4 text-center">
                    <Button size="sm">Use This Layout</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="structure" className="min-h-[300px]">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-4">Component Structure</h4>
                  <ul className="space-y-2">
                    {getComponentKeys().map((key) => (
                      <li key={key} className="p-2 bg-muted rounded-md">
                        <div className="font-medium">
                          {formatComponentName(key)}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {Array.isArray(layout[key])
                            ? `${layout[key].length} items`
                            : key === "navComponent"
                            ? `${
                                layout[key].items?.length || 0
                              } navigation items`
                            : key === "featuresComponent" && layout[key].cards
                            ? `${layout[key].cards.length} feature cards`
                            : "Component data available"}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="code" className="min-h-[300px]">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">JSON Data</h4>
                  <div className="bg-muted p-3 rounded-md overflow-auto max-h-[300px]">
                    <pre className="text-xs">
                      {JSON.stringify(layout, null, 2)}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LayoutDetails;
