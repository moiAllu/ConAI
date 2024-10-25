import type { Config } from "tailwindcss"
const { fontFamily } = require("tailwindcss/defaultTheme")

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
      typography: {
        DEFAULT: {
          css: {
            // Customize the styles here
            fontFamily :{
              sans: ["var(--font-sans)", ...fontFamily.sans],
            },
            div: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
              fontSize: '0.95em',
            },
            p: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
              paddingLeft: '0.6em',
              paddingRight: '0.7em',
              fontSize: '1em',
            },

            h1: {
              fontSize: '1.25em',
              fontWeight: '700',
              padding: '0.5em'
            },
            h2: {
              fontSize: '1.15em',
              fontWeight: '600',
              paddingLeft: '0.7em',
              paddingTop: '0.5em',
              paddingBottom: '0.5em',
            },
            h3: {
              fontSize: '1em',
              fontWeight: '600',
              paddingLeft: '0.9em',
              paddingTop: '0.5em',
              paddingBottom: '0.5em',
            },
            // ... other styles
            
            ul: {
              paddingLeft: '1.5em',
              listStyleType: 'disc',
              marginTop: '0.25em',
              marginBottom: '0.25em',
              fontSize: '0.95em',
            },
            li: {
              marginLeft: '1em',
              marginTop: '0.45em',
              marginBottom: '0.45em',
            
            },
            'li > ul': {
              marginTop: '0.25em',
              marginBottom: '0.25em',
            },
            'li > ol': {
              marginTop: '0.25em',
              marginBottom: '0.25em',
            },
            // Style checkboxes
            'li > input[type="checkbox"]': {
              listStyleType: 'none',
              borderWidth: '1px',
              marginRight: '0.1em',
              borderRadius: '0.2em',
              
            },
            'li > input[type="checkbox"]:checked': {
              backgroundColor: 'black',
            },
            // Style blockquote
            blockquote: {
              borderLeftWidth: '0.25em',
              borderLeftColor: 'black',
              paddingLeft: '1em',
              marginLeft: '0',
              marginRight: '0',
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            // Style code blocks
            code: {
              backgroundColor: 'black',
              color: 'white',
              padding: '0.2em',
              borderRadius: '0.2em',
            },
            pre: {
              backgroundColor: 'black',
              color: 'white',
              padding: '0.5em',
              borderRadius: '0.2em',
            },
            // Style tables
            table: {
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '0.5em',
              marginBottom: '0.5em',
              backgroundColor: 'var(--table-bg)',
            },
            th: {
              border: '1px solid grey',
              padding: '0.5em',
              backgroundColor: 'var(--header-bg)',
              color: 'var(--header-color)',
            },
            td: {
              border: '1px solid grey',
              padding: '0.5em',
            },
            // Style images
            img: {
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            },
            // Style links
            a: {
              color: 'black',
              textDecoration: 'underline',
            },
            // Style horizontal rules
            hr: {
              borderTopWidth: '1px',
              borderTopColor: 'black',
              marginTop: '1em',
              marginBottom: '1em',
            },
            // Style lists
            
            ol: {
              listStyleType: 'decimal',
              paddingLeft: '1em',
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
          
          },
        },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography'),],
} satisfies Config

export default config