"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Trash2, UserPlus } from "lucide-react"
import { AppLayout } from "@/components/layouts/app-layout"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// User type
interface RegisteredUser {
  id: string
  name: string
  email: string
  registeredAt: string
}

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export default function RegisterPage() {
  const [users, setUsers] = React.useState<RegisteredUser[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      registeredAt: new Date(2025, 9, 1, 10, 30).toISOString(),
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      registeredAt: new Date(2025, 9, 2, 14, 15).toISOString(),
    },
  ])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Create new user
    const newUser: RegisteredUser = {
      id: Date.now().toString(),
      name: values.name,
      email: values.email,
      registeredAt: new Date().toISOString(),
    }

    // Add to users list
    setUsers((prev) => [newUser, ...prev])

    // Show success toast
    toast.success("Registration successful!", {
      description: `Welcome, ${values.name}!`,
    })

    // Reset form
    form.reset()
  }

  function deleteUser(id: string) {
    const user = users.find((u) => u.id === id)
    setUsers((prev) => prev.filter((u) => u.id !== id))
    toast.info("User removed", {
      description: `${user?.name} has been removed from the list.`,
    })
  }

  function formatDateTime(isoString: string) {
    const date = new Date(isoString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-8 md:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              User Registration
            </h1>
            <p className="mt-2 text-muted-foreground">
              A complete example demonstrating form validation, state management, and data tables.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Registration Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Register New User
                </CardTitle>
                <CardDescription>
                  Fill out the form below to register a new user. All fields are required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Must be at least 8 characters long.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Register User
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="lg:row-span-1">
              <CardHeader>
                <CardTitle>Form Features</CardTitle>
                <CardDescription>
                  This registration form demonstrates best practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Badge variant="secondary" className="mt-0.5">
                      1
                    </Badge>
                    <span>
                      <strong className="text-foreground">Zod Validation:</strong>{" "}
                      Type-safe schema validation with detailed error messages
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="secondary" className="mt-0.5">
                      2
                    </Badge>
                    <span>
                      <strong className="text-foreground">React Hook Form:</strong>{" "}
                      Performant form management with minimal re-renders
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="secondary" className="mt-0.5">
                      3
                    </Badge>
                    <span>
                      <strong className="text-foreground">Password Matching:</strong>{" "}
                      Custom validation to ensure passwords match
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="secondary" className="mt-0.5">
                      4
                    </Badge>
                    <span>
                      <strong className="text-foreground">Toast Notifications:</strong>{" "}
                      User feedback on success and errors
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="secondary" className="mt-0.5">
                      5
                    </Badge>
                    <span>
                      <strong className="text-foreground">State Management:</strong>{" "}
                      Real-time updates to the user table below
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Separator */}
          <Separator className="my-12" />

          {/* Registered Users Table */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Registered Users
              </h2>
              <p className="mt-1 text-muted-foreground">
                Total: <Badge variant="secondary">{users.length}</Badge> user{users.length !== 1 ? "s" : ""}
              </p>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Registered</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="h-24 text-center text-muted-foreground"
                          >
                            No users registered yet. Use the form above to add one.
                          </TableCell>
                        </TableRow>
                      ) : (
                        users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">
                              {user.name}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {user.email}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {formatDateTime(user.registeredAt)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteUser(user.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technical Note */}
          <Card className="mt-8 border-muted bg-muted/50">
            <CardHeader>
              <CardTitle className="text-sm">💡 Implementation Note</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                This example uses React state for demonstration purposes. In a
                production application, you would:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>Send form data to an API endpoint</li>
                <li>Store users in a database (PostgreSQL, MongoDB, etc.)</li>
                <li>Implement authentication and authorization</li>
                <li>Add pagination for large datasets</li>
                <li>Include search and filtering capabilities</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
