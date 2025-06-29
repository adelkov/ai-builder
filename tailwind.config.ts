import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

export default {
    darkMode: ["class"],
    content: ["./src/**/*.tsx"],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'var(--font-geist-sans)',
                    ...fontFamily.sans
                ]
  		},
  		typography: {
  			invert: {
  				css: {
  					'--tw-prose-body': 'var(--tw-prose-invert-body)',
  					'--tw-prose-headings': 'var(--tw-prose-invert-headings)',
  					'--tw-prose-links': 'var(--tw-prose-invert-links)',
  					'--tw-prose-links-hover': 'var(--tw-prose-invert-links-hover)',
  					'--tw-prose-underline': 'var(--tw-prose-invert-underline)',
  					'--tw-prose-underline-hover': 'var(--tw-prose-invert-underline-hover)',
  					'--tw-prose-bold': 'var(--tw-prose-invert-bold)',
  					'--tw-prose-counters': 'var(--tw-prose-invert-counters)',
  					'--tw-prose-bullets': 'var(--tw-prose-invert-bullets)',
  					'--tw-prose-hr': 'var(--tw-prose-invert-hr)',
  					'--tw-prose-quote-borders': 'var(--tw-prose-invert-quote-borders)',
  					'--tw-prose-captions': 'var(--tw-prose-invert-captions)',
  					'--tw-prose-code': 'var(--tw-prose-invert-code)',
  					'--tw-prose-code-bg': 'var(--tw-prose-invert-code-bg)',
  					'--tw-prose-pre-code': 'var(--tw-prose-invert-pre-code)',
  					'--tw-prose-pre-bg': 'var(--tw-prose-invert-pre-bg)',
  					'--tw-prose-pre-border': 'var(--tw-prose-invert-pre-border)',
  					'--tw-prose-th-borders': 'var(--tw-prose-invert-th-borders)',
  					'--tw-prose-td-borders': 'var(--tw-prose-invert-td-borders)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwind-scrollbar"), typography, require("tailwindcss-animate")],
} satisfies Config;
