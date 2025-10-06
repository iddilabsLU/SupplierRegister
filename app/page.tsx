"use client"

import * as React from "react"
import {
  AlertCircle,
  Bell,
  Calendar,
  Check,
  CheckCircle,
  ChevronDown,
  Copy,
  CreditCard,
  Download,
  File,
  Folder,
  Heart,
  Home,
  Info,
  Link,
  Mail,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Star,
  Sun,
  Trash,
  User,
  XCircle,
} from "lucide-react"
import { AppLayout } from "@/components/layouts/app-layout"
import { IconBadge } from "@/components/shared/icon-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ThemeCheckPage() {
  const [sliderValue, setSliderValue] = React.useState([50])

  return (
    <AppLayout>
      <div className="bg-background">
        <div className="container px-4 py-8 md:px-8">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
            Component Showcase
          </h2>
          <p className="text-lg text-muted-foreground">
            A comprehensive showcase of all shadcn components with custom color
            tokens. All components use consistent styling for visual cohesion.
          </p>
        </section>

        {/* Color Tokens */}
        <section className="mb-12">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">
            Color Palette
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Background</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-16 rounded-md bg-background ring-1 ring-border" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Foreground</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-16 rounded-md bg-foreground" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Primary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-16 rounded-md bg-primary" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Secondary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-16 rounded-md bg-secondary" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Muted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-16 rounded-md bg-muted" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Accent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-16 rounded-md bg-accent" />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-12">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">
            Typography
          </h3>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-foreground">
                  Heading 1
                </h1>
                <h2 className="text-3xl font-semibold text-foreground">
                  Heading 2
                </h2>
                <h3 className="text-2xl font-semibold text-foreground">
                  Heading 3
                </h3>
                <h4 className="text-xl font-medium text-foreground">
                  Heading 4
                </h4>
                <p className="text-base text-foreground">
                  Regular paragraph text with standard line height and spacing.
                </p>
                <p className="text-sm text-muted-foreground">
                  Muted text for secondary information and descriptions.
                </p>
                <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
                  const example = &quot;code snippet&quot;
                </code>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Buttons */}
        <section className="mb-12">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">
            Buttons
          </h3>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button disabled>Disabled</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button>
                  <Mail className="mr-2 h-4 w-4" />
                  With Icon
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Form Inputs */}
        <section className="mb-12">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">
            Form Inputs
          </h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Text Inputs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="email@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="search" placeholder="Search..." className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disabled">Disabled Input</Label>
                  <Input id="disabled" disabled placeholder="Disabled" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Selection Inputs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Checkboxes</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="font-normal">
                        Accept terms and conditions
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="marketing" defaultChecked />
                      <Label htmlFor="marketing" className="font-normal">
                        Receive marketing emails
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Radio Group</Label>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one" className="font-normal">
                        Option One
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two" className="font-normal">
                        Option Two
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="framework">Select</Label>
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select a framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="vue">Vue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications">Notifications</Label>
                    <Switch id="notifications" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Slider */}
        <section className="mb-12">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">
            Slider
          </h3>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Volume: {sliderValue[0]}%</Label>
                </div>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Badges */}
        <section className="mb-12">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">
            Badges
          </h3>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Alerts */}
        <section className="mb-12">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">
            Alerts
          </h3>
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                This is a default alert with an informational message.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <Info className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                This is a destructive alert indicating an error or warning.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Avatars & Skeletons */}
        <section className="mb-12">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">
            Avatars & Skeletons
          </h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Avatars</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loading Skeletons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tabs */}
        <section className="mb-12">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">Tabs</h3>
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="account">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="@username" />
                  </div>
                </TabsContent>
                <TabsContent value="password" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current">Current Password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new">New Password</Label>
                    <Input id="new" type="password" />
                  </div>
                </TabsContent>
                <TabsContent value="notifications" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Email Notifications</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Push Notifications</Label>
                    <Switch />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* Table */}
        <section className="mb-12">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">
            Tables
          </h3>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">John Doe</TableCell>
                    <TableCell>
                      <Badge>Active</Badge>
                    </TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jane Smith</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Inactive</Badge>
                    </TableCell>
                    <TableCell>User</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bob Johnson</TableCell>
                    <TableCell>
                      <Badge>Active</Badge>
                    </TableCell>
                    <TableCell>Moderator</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* Accordion */}
        <section className="mb-12">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">
            Accordion
          </h3>
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern and follows
                    accessibility best practices.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that match your theme
                    tokens automatically.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It&apos;s animated by default with smooth transitions.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Interactive Components */}
        <section className="mb-12">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">
            Interactive Components
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Dialog</CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Open Dialog
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>
                        This is a dialog component for displaying important
                        information.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Alert Dialog</CardTitle>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Delete Item
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Dropdown Menu</CardTitle>
              </CardHeader>
              <CardContent>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Open Menu
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Popover</CardTitle>
              </CardHeader>
              <CardContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Open Popover
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="space-y-2">
                      <h4 className="font-medium">Dimensions</h4>
                      <p className="text-sm text-muted-foreground">
                        Set the dimensions for the layer.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tooltips */}
        <section className="mb-12">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">
            Tooltips
          </h3>
          <Card>
            <CardContent className="pt-6">
              <TooltipProvider>
                <div className="flex flex-wrap gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This is a tooltip</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Star className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to favorites</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy to clipboard</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete item</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>
        </section>

        {/* Lucide Icons */}
        <section className="mb-12">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">
            Lucide Icons
          </h3>
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Icons use <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">currentColor</code> and automatically inherit theme colors via className.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Apply color classes like <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">text-primary</code>, <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">text-destructive</code>, etc.
                </p>
              </div>

              {/* Main Color Tokens Grid */}
              <div className="mb-8">
                <h4 className="mb-4 text-sm font-medium text-foreground">All Theme Color Tokens:</h4>
                <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6">
                  <div className="flex flex-col items-center gap-2">
                    <Home className="h-6 w-6 text-foreground" />
                    <span className="text-xs text-muted-foreground text-center">
                      foreground
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <User className="h-6 w-6 text-foreground" />
                    <span className="text-xs text-muted-foreground text-center">
                      foreground
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <File className="h-6 w-6 text-foreground" />
                    <span className="text-xs text-muted-foreground text-center">
                      foreground
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Mail className="h-6 w-6 text-primary" />
                    <span className="text-xs text-muted-foreground text-center">
                      primary
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Calendar className="h-6 w-6 text-primary" />
                    <span className="text-xs text-muted-foreground text-center">
                      primary
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Settings className="h-6 w-6 text-primary" />
                    <span className="text-xs text-muted-foreground text-center">
                      primary
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Folder className="h-6 w-6 text-secondary-foreground" />
                    <span className="text-xs text-muted-foreground text-center">
                      secondary
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Package className="h-6 w-6 text-secondary-foreground" />
                    <span className="text-xs text-muted-foreground text-center">
                      secondary
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <ShoppingCart className="h-6 w-6 text-secondary-foreground" />
                    <span className="text-xs text-muted-foreground text-center">
                      secondary
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Bell className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground text-center">
                      muted
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Info className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground text-center">
                      muted
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Link className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground text-center">
                      muted
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Heart className="h-6 w-6 text-destructive" />
                    <span className="text-xs text-muted-foreground text-center">
                      destructive
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <AlertCircle className="h-6 w-6 text-destructive" />
                    <span className="text-xs text-muted-foreground text-center">
                      destructive
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <XCircle className="h-6 w-6 text-destructive" />
                    <span className="text-xs text-muted-foreground text-center">
                      destructive
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Star className="h-6 w-6 text-accent-foreground" />
                    <span className="text-xs text-muted-foreground text-center">
                      accent
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-accent-foreground" />
                    <span className="text-xs text-muted-foreground text-center">
                      accent
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Sun className="h-6 w-6 text-accent-foreground" />
                    <span className="text-xs text-muted-foreground text-center">
                      accent
                    </span>
                  </div>
                </div>
              </div>

              {/* Size Variations */}
              <div className="border-t pt-6">
                <h4 className="mb-4 text-sm font-medium text-foreground">Size Variations:</h4>
                <div className="flex items-end gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <Download className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground">
                      h-4 w-4
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Download className="h-6 w-6 text-primary" />
                    <span className="text-xs text-muted-foreground">
                      h-6 w-6
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Download className="h-8 w-8 text-primary" />
                    <span className="text-xs text-muted-foreground">
                      h-8 w-8
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CreditCard className="h-4 w-4 text-destructive" />
                    <span className="text-xs text-muted-foreground">
                      h-4 w-4
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CreditCard className="h-6 w-6 text-destructive" />
                    <span className="text-xs text-muted-foreground">
                      h-6 w-6
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CreditCard className="h-8 w-8 text-destructive" />
                    <span className="text-xs text-muted-foreground">
                      h-8 w-8
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Icon Badge Styles - Type1 (Default) */}
        <section className="mb-12">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">
            Icon Badge Styles - Type1 (Default)
          </h3>
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Dark background badges with light icons - reusable <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">IconBadge</code> component pattern.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Uses <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">variant=&quot;type1&quot;</code> with <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bg-primary</code> and <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">text-primary-foreground</code>.
                </p>
              </div>

              <div className="mb-8">
                <h4 className="mb-4 text-sm font-medium text-foreground">Icon Gallery:</h4>
                <div className="grid grid-cols-4 gap-6 sm:grid-cols-6 md:grid-cols-8">
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Home} variant="type1" />
                    <span className="text-xs text-muted-foreground">Home</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Mail} variant="type1" />
                    <span className="text-xs text-muted-foreground">Mail</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Calendar} variant="type1" />
                    <span className="text-xs text-muted-foreground">Calendar</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Settings} variant="type1" />
                    <span className="text-xs text-muted-foreground">Settings</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={User} variant="type1" />
                    <span className="text-xs text-muted-foreground">User</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Bell} variant="type1" />
                    <span className="text-xs text-muted-foreground">Bell</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Heart} variant="type1" />
                    <span className="text-xs text-muted-foreground">Heart</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Star} variant="type1" />
                    <span className="text-xs text-muted-foreground">Star</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={File} variant="type1" />
                    <span className="text-xs text-muted-foreground">File</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Folder} variant="type1" />
                    <span className="text-xs text-muted-foreground">Folder</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Package} variant="type1" />
                    <span className="text-xs text-muted-foreground">Package</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Download} variant="type1" />
                    <span className="text-xs text-muted-foreground">Download</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="mb-4 text-sm font-medium text-foreground">Size Variations:</h4>
                <div className="flex items-end gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Download} variant="type1" size="sm" />
                    <span className="text-xs text-muted-foreground">Small</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Download} variant="type1" size="md" />
                    <span className="text-xs text-muted-foreground">Medium</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Download} variant="type1" size="lg" />
                    <span className="text-xs text-muted-foreground">Large</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Icon Badge Styles - Type2 (Secondary) */}
        <section className="mb-12">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">
            Icon Badge Styles - Type2 (Secondary)
          </h3>
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Light background badges with dark icons - reusable <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">IconBadge</code> component pattern.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Uses <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">variant=&quot;type2&quot;</code> with <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bg-secondary</code> and <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">text-secondary-foreground</code>.
                </p>
              </div>

              <div className="mb-8">
                <h4 className="mb-4 text-sm font-medium text-foreground">Icon Gallery:</h4>
                <div className="grid grid-cols-4 gap-6 sm:grid-cols-6 md:grid-cols-8">
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Home} variant="type2" />
                    <span className="text-xs text-muted-foreground">Home</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Mail} variant="type2" />
                    <span className="text-xs text-muted-foreground">Mail</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Calendar} variant="type2" />
                    <span className="text-xs text-muted-foreground">Calendar</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Settings} variant="type2" />
                    <span className="text-xs text-muted-foreground">Settings</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={User} variant="type2" />
                    <span className="text-xs text-muted-foreground">User</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Bell} variant="type2" />
                    <span className="text-xs text-muted-foreground">Bell</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Heart} variant="type2" />
                    <span className="text-xs text-muted-foreground">Heart</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Star} variant="type2" />
                    <span className="text-xs text-muted-foreground">Star</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={File} variant="type2" />
                    <span className="text-xs text-muted-foreground">File</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Folder} variant="type2" />
                    <span className="text-xs text-muted-foreground">Folder</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Package} variant="type2" />
                    <span className="text-xs text-muted-foreground">Package</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Download} variant="type2" />
                    <span className="text-xs text-muted-foreground">Download</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="mb-4 text-sm font-medium text-foreground">Size Variations:</h4>
                <div className="flex items-end gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Download} variant="type2" size="sm" />
                    <span className="text-xs text-muted-foreground">Small</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Download} variant="type2" size="md" />
                    <span className="text-xs text-muted-foreground">Medium</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <IconBadge icon={Download} variant="type2" size="lg" />
                    <span className="text-xs text-muted-foreground">Large</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Separator */}
        <Separator className="my-12" />

        {/* Footer Info */}
        <section className="text-center">
          <h3 className="mb-4 text-xl font-semibold text-foreground">
            Ready to Build
          </h3>
          <p className="text-muted-foreground">
            This boilerplate is ready for your next project. All components
            inherit theme colors automatically.
          </p>
        </section>
        </div>
      </div>
    </AppLayout>
  )
}
