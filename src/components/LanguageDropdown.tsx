import * as React from "react";
import { ChevronDown, Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLanguage, Language } from "../contexts/LanguageContext";

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
];

interface LanguageDropdownProps {
  variant?: "nav" | "app";
  className?: string;
}

export function LanguageDropdown({
  variant = "nav",
  className = "",
}: LanguageDropdownProps) {
  // Safe defaults in case context is unavailable
  let language: Language = "en";
  let setLanguage: (lang: Language) => void = () => {};
  let languageText = "Language";

  try {
    const context = useLanguage();
    language = context.language;
    setLanguage = context.setLanguage;
    languageText = context.t?.nav?.language || "Language";
  } catch (err) {
    console.warn("LanguageDropdown: context not found, using defaults");
  }

  const currentLanguage = languages.find((lang) => lang.code === language);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
  };

  if (variant === "nav") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`gap-2 font-medium transition-colors hover:text-white ${className}`}
            style={{ color: "var(--landing-text-secondary)" }}
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">{currentLanguage?.flag}</span>
            <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 border z-50"
          style={{
            backgroundColor: "var(--landing-bg-elevated)",
            borderColor: "var(--landing-border-subtle)",
          }}
        >
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex items-center gap-3 cursor-pointer px-3 py-2 transition-colors ${
                language === lang.code
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-white/5"
              }`}
              style={{
                color:
                  language === lang.code
                    ? "var(--landing-accent-primary)"
                    : "var(--landing-text-secondary)",
              }}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="flex-1">{lang.name}</span>
              {language === lang.code && (
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "var(--landing-accent-primary)" }}
                />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // ✅ App variant
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`gap-2 h-8 px-2 ${className}`}
        >
          <Globe className="w-4 h-4" />
          <span className="text-lg">{currentLanguage?.flag}</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 z-50">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`flex items-center gap-3 cursor-pointer ${
              language === lang.code ? "bg-accent" : ""
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="flex-1">{lang.name}</span>
            {language === lang.code && (
              <div className="w-2 h-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
