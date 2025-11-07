import * as React from "react"
import { cn } from "@/lib/utils"

// Basic Select components
const Select = React.forwardRef<
    HTMLSelectElement,
    React.SelectHTMLAttributes<HTMLSelectElement> & {
        onValueChange?: (value: string) => void
    }
>(({ className, onValueChange, onChange, ...props }, ref) => (
    <select
        ref={ref}
        className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}
        onChange={(e) => {
            onChange?.(e)
            onValueChange?.(e.target.value)
        }}
        {...props}
    />
))
Select.displayName = "Select"

const SelectContent = ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
)

const SelectItem = React.forwardRef<
    HTMLOptionElement,
    React.OptionHTMLAttributes<HTMLOptionElement>
>(({ children, ...props }, ref) => (
    <option ref={ref} {...props}>
        {children}
    </option>
))
SelectItem.displayName = "SelectItem"

const SelectTrigger = Select
const SelectValue = ({ placeholder }: { placeholder?: string }) => {
    // This is a placeholder component for compatibility
    return placeholder ? <span>{placeholder}</span> : null
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }