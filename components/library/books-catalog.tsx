"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Download,
  Upload,
  Filter,
  Eye,
  Edit,
  Trash2,
  Heart,
  BookOpen,
  Tag,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  X,
} from "lucide-react"
import Image from "next/image"

interface BookType {
  id: string
  title: string
  author: string
  isbn: string
  category: string
  publishedDate: string
  publisher: string
  status: "Available" | "Checked Out" | "Reserved" | "Lost" | "Processing"
  coverImage: string
  copies: number
  language: string
  description: string
  tags: string[]
  location: string
  acquisition: {
    date: string
    price: string
    source: string
  }
  circulation: {
    totalCheckouts: number
    lastCheckout: string | null
    returnDate: string | null
  }
}

export function BooksCatalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null)
  const [showBookDetails, setShowBookDetails] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [showAddBookModal, setShowAddBookModal] = useState(false)

  // Mock book data
  const books: BookType[] = [
    {
      id: "1",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "9780446310789",
      category: "Fiction",
      publishedDate: "1960-07-11",
      publisher: "J.B. Lippincott & Co.",
      status: "Available",
      coverImage: "/placeholder.svg?height=280&width=200&query=To+Kill+a+Mockingbird+book+cover",
      copies: 5,
      language: "English",
      description:
        "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.",
      tags: ["Classic", "American Literature", "Coming-of-age"],
      location: "Fiction Section, Shelf A-12",
      acquisition: {
        date: "2022-03-15",
        price: "$12.99",
        source: "Book Depository",
      },
      circulation: {
        totalCheckouts: 47,
        lastCheckout: "2023-10-12",
        returnDate: "2023-11-02",
      },
    },
    {
      id: "2",
      title: "1984",
      author: "George Orwell",
      isbn: "9780451524935",
      category: "Fiction",
      publishedDate: "1949-06-08",
      publisher: "Secker & Warburg",
      status: "Checked Out",
      coverImage: "/placeholder.svg?height=280&width=200&query=1984+George+Orwell+book+cover",
      copies: 3,
      language: "English",
      description:
        "A dystopian social science fiction novel that examines the consequences of totalitarianism, mass surveillance, and repressive regimentation.",
      tags: ["Dystopian", "Classic", "Political Fiction"],
      location: "Fiction Section, Shelf B-5",
      acquisition: {
        date: "2021-08-23",
        price: "$10.50",
        source: "Amazon",
      },
      circulation: {
        totalCheckouts: 52,
        lastCheckout: "2023-12-05",
        returnDate: "2024-01-05",
      },
    },
    {
      id: "3",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "9780743273565",
      category: "Fiction",
      publishedDate: "1925-04-10",
      publisher: "Charles Scribner's Sons",
      status: "Available",
      coverImage: "/placeholder.svg?height=280&width=200&query=The+Great+Gatsby+book+cover",
      copies: 4,
      language: "English",
      description:
        "A novel that follows a cast of characters living in the fictional town of West Egg on Long Island during the summer of 1922.",
      tags: ["Classic", "American Literature", "Jazz Age"],
      location: "Fiction Section, Shelf A-8",
      acquisition: {
        date: "2022-01-10",
        price: "$9.99",
        source: "Barnes & Noble",
      },
      circulation: {
        totalCheckouts: 39,
        lastCheckout: "2023-09-18",
        returnDate: "2023-10-08",
      },
    },
    {
      id: "4",
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      isbn: "9780747532743",
      category: "Fantasy",
      publishedDate: "1997-06-26",
      publisher: "Bloomsbury",
      status: "Available",
      coverImage: "/placeholder.svg?height=280&width=200&query=Harry+Potter+Philosopher+Stone+book+cover",
      copies: 8,
      language: "English",
      description:
        "The first novel in the Harry Potter series that follows a young wizard's adventures at Hogwarts School of Witchcraft and Wizardry.",
      tags: ["Fantasy", "Young Adult", "Magic"],
      location: "Fantasy Section, Shelf C-1",
      acquisition: {
        date: "2020-12-15",
        price: "$15.99",
        source: "Scholastic Book Fair",
      },
      circulation: {
        totalCheckouts: 78,
        lastCheckout: "2023-11-20",
        returnDate: "2023-12-10",
      },
    },
    {
      id: "5",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      isbn: "9780141439518",
      category: "Fiction",
      publishedDate: "1813-01-28",
      publisher: "T. Egerton, Whitehall",
      status: "Reserved",
      coverImage: "/placeholder.svg?height=280&width=200&query=Pride+and+Prejudice+book+cover",
      copies: 3,
      language: "English",
      description:
        "A romantic novel that follows the character development of Elizabeth Bennet, who learns about the repercussions of hasty judgments.",
      tags: ["Classic", "Romance", "Regency"],
      location: "Fiction Section, Shelf A-15",
      acquisition: {
        date: "2021-05-20",
        price: "$8.50",
        source: "Penguin Classics",
      },
      circulation: {
        totalCheckouts: 42,
        lastCheckout: "2023-12-01",
        returnDate: null,
      },
    },
    {
      id: "6",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      isbn: "9780261102217",
      category: "Fantasy",
      publishedDate: "1937-09-21",
      publisher: "George Allen & Unwin",
      status: "Available",
      coverImage: "/placeholder.svg?height=280&width=200&query=The+Hobbit+book+cover",
      copies: 4,
      language: "English",
      description:
        "A children's fantasy novel about the adventures of hobbit Bilbo Baggins, who is led by the wizard Gandalf to recover treasure guarded by the dragon Smaug.",
      tags: ["Fantasy", "Adventure", "Classic"],
      location: "Fantasy Section, Shelf C-3",
      acquisition: {
        date: "2021-07-12",
        price: "$14.50",
        source: "Book Depository",
      },
      circulation: {
        totalCheckouts: 55,
        lastCheckout: "2023-10-05",
        returnDate: "2023-10-25",
      },
    },
    {
      id: "7",
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      isbn: "9780316769488",
      category: "Fiction",
      publishedDate: "1951-07-16",
      publisher: "Little, Brown and Company",
      status: "Available",
      coverImage: "/placeholder.svg?height=280&width=200&query=Catcher+in+the+Rye+book+cover",
      copies: 3,
      language: "English",
      description:
        "The story of a teenage boy's experiences in New York City during the 1950s, dealing with themes of adolescent angst and alienation.",
      tags: ["Classic", "Coming-of-age", "American Literature"],
      location: "Fiction Section, Shelf B-2",
      acquisition: {
        date: "2022-02-05",
        price: "$11.25",
        source: "Amazon",
      },
      circulation: {
        totalCheckouts: 37,
        lastCheckout: "2023-09-10",
        returnDate: "2023-09-30",
      },
    },
    {
      id: "8",
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      isbn: "9780618640157",
      category: "Fantasy",
      publishedDate: "1954-07-29",
      publisher: "Allen & Unwin",
      status: "Checked Out",
      coverImage: "/placeholder.svg?height=280&width=200&query=Lord+of+the+Rings+book+cover",
      copies: 2,
      language: "English",
      description:
        "An epic high-fantasy novel that follows the quest to destroy the One Ring, which was created by the Dark Lord Sauron.",
      tags: ["Fantasy", "Epic", "Adventure"],
      location: "Fantasy Section, Shelf C-4",
      acquisition: {
        date: "2021-03-28",
        price: "$25.99",
        source: "Barnes & Noble",
      },
      circulation: {
        totalCheckouts: 49,
        lastCheckout: "2023-11-15",
        returnDate: "2024-01-15",
      },
    },
  ]

  const categories = [
    "All",
    "Fiction",
    "Fantasy",
    "Science",
    "History",
    "Biography",
    "Reference",
    "Textbook",
    "Children's",
  ]

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery)

    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const openBookDetails = (book: BookType) => {
    setSelectedBook(book)
    setShowBookDetails(true)
  }

  const statusColors = {
    Available: "bg-success text-white",
    "Checked Out": "bg-error text-white",
    Reserved: "bg-warning text-white",
    Lost: "bg-secondary text-white",
    Processing: "bg-info text-white",
  }

  const itemsPerPage = 8
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage)
  const currentBooks = filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#2E263D] dark:text-white">Books Catalog</h1>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors flex items-center gap-2">
              <Upload size={16} />
              Import
            </button>
            <button className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors flex items-center gap-2">
              <Download size={16} />
              Export
            </button>
            <button
              onClick={() => setShowAddBookModal(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-[#8C57FF] hover:bg-[#7C3AED] rounded-md transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              Add New Book
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-md bg-[#F9FAFB] dark:bg-[#28243D] text-[#374151] dark:text-[rgba(231,227,252,0.9)] placeholder:text-[#6B7280] dark:placeholder:text-[rgba(231,227,252,0.6)] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent"
            />
          </div>

          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2 pr-10 text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent min-w-[150px]"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] pointer-events-none" />
          </div>

          <button className="px-3 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors flex items-center gap-2">
            <Filter size={16} />
            More Filters
          </button>

          <div className="flex items-center ml-auto">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-l-md ${viewMode === "grid" ? "bg-[#8C57FF] text-white" : "bg-[#F9FAFB] dark:bg-[#28243D] text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-r-md ${viewMode === "list" ? "bg-[#8C57FF] text-white" : "bg-[#F9FAFB] dark:bg-[#28243D] text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Books Display */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-[#E5E7EB] dark:text-[rgba(255,255,255,0.1)]" />
            <h3 className="mt-4 text-lg font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
              No books found
            </h3>
            <p className="mt-1 text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white dark:bg-[#28243D] rounded-lg shadow-sm border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)] overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-64 flex items-center justify-center bg-[#F9FAFB] dark:bg-[#3D3759] p-4">
                  <Image
                    src={book.coverImage || "/placeholder.svg"}
                    alt={book.title}
                    width={140}
                    height={200}
                    className="h-full w-auto object-contain"
                  />
                  <span
                    className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-full ${statusColors[book.status]}`}
                  >
                    {book.status}
                  </span>
                  <button className="absolute top-2 left-2 p-1.5 rounded-full bg-white/80 dark:bg-[#28243D]/80 text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:text-[#8C57FF] transition-colors">
                    <Heart size={16} />
                  </button>
                </div>
                <div className="p-4">
                  <h3
                    className="font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)] truncate"
                    title={book.title}
                  >
                    {book.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] mt-1">by {book.author}</p>
                  <div className="flex items-center mt-3 text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                    <Tag size={14} className="mr-1" />
                    <span>{book.category}</span>
                    <span className="mx-2">•</span>
                    <BookOpen size={14} className="mr-1" />
                    <span>{book.copies} copies</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={() => openBookDetails(book)}
                      className="text-xs font-medium text-[#8C57FF] hover:text-[#7C3AED] transition-colors flex items-center"
                    >
                      View Details
                      <ChevronRight size={14} className="ml-1" />
                    </button>
                    <div className="flex items-center space-x-1">
                      <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 rounded-md text-[#EF4444] hover:bg-[#FEF2F2] dark:hover:bg-[rgba(239,68,68,0.1)] transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                    Title
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                    Author
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                    ISBN
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                    Copies
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentBooks.map((book) => (
                  <tr
                    key={book.id}
                    className="border-b border-[#F3F4F6] dark:border-[rgba(255,255,255,0.05)] hover:bg-[#F9FAFB] dark:hover:bg-[#28243D] transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="h-10 w-8 mr-3 flex-shrink-0">
                          <Image
                            src={book.coverImage || "/placeholder.svg"}
                            alt={book.title}
                            width={32}
                            height={40}
                            className="h-full w-auto object-cover rounded"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                            {book.title}
                          </div>
                          <div className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] mt-0.5">
                            <Calendar size={12} className="inline mr-1" />
                            {new Date(book.publishedDate).getFullYear()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{book.author}</td>
                    <td className="py-4 px-4 text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{book.isbn}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F3F4F6] dark:bg-[#3D3759] text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                        {book.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[book.status]}`}
                      >
                        {book.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{book.copies}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openBookDetails(book)}
                          className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="p-1.5 rounded-md text-[#EF4444] hover:bg-[#FEF2F2] dark:hover:bg-[rgba(239,68,68,0.1)] transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
                          title="More"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
            <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredBooks.length)}</span> of{" "}
            <span className="font-medium">{filteredBooks.length}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-2 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              const pageNumber = i + 1
              return (
                <button
                  key={i}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`min-w-[32px] h-8 px-3 text-sm font-medium rounded-md ${
                    currentPage === pageNumber
                      ? "bg-[#8C57FF] text-white"
                      : "text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759]"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            })}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Book Details Modal */}
      {showBookDetails && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
              <h2 className="text-xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">Book Details</h2>
              <button
                onClick={() => setShowBookDetails(false)}
                className="p-2 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <div className="bg-[#F9FAFB] dark:bg-[#3D3759] p-6 rounded-lg flex items-center justify-center">
                    <Image
                      src={selectedBook.coverImage || "/placeholder.svg"}
                      alt={selectedBook.title}
                      width={200}
                      height={280}
                      className="max-h-[280px] w-auto object-contain"
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Status:</span>
                      <span
                        className={`text-sm font-medium px-2 py-0.5 rounded-full ${statusColors[selectedBook.status]}`}
                      >
                        {selectedBook.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Copies:</span>
                      <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                        {selectedBook.copies}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Total Checkouts:</span>
                      <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                        {selectedBook.circulation.totalCheckouts}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Last Checkout:</span>
                      <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                        {selectedBook.circulation.lastCheckout
                          ? new Date(selectedBook.circulation.lastCheckout).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Due Date:</span>
                      <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                        {selectedBook.circulation.returnDate
                          ? new Date(selectedBook.circulation.returnDate).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-2xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-1">
                    {selectedBook.title}
                  </h3>
                  <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] text-lg">by {selectedBook.author}</p>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">ISBN</h4>
                      <p className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{selectedBook.isbn}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Category</h4>
                      <p className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{selectedBook.category}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                        Published Date
                      </h4>
                      <p className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                        {new Date(selectedBook.publishedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                        Publisher
                      </h4>
                      <p className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{selectedBook.publisher}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Language</h4>
                      <p className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{selectedBook.language}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Location</h4>
                      <p className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{selectedBook.location}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] mb-2">
                      Description
                    </h4>
                    <p className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{selectedBook.description}</p>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedBook.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F3F4F6] dark:bg-[#3D3759] text-[#374151] dark:text-[rgba(231,227,252,0.9)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] mb-2">
                      Acquisition Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Date</h5>
                        <p className="text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                          {new Date(selectedBook.acquisition.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Price</h5>
                        <p className="text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                          {selectedBook.acquisition.price}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Source</h5>
                        <p className="text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                          {selectedBook.acquisition.source}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
              <button
                onClick={() => setShowBookDetails(false)}
                className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-[#8C57FF] hover:bg-[#7C3AED] rounded-md transition-colors">
                Edit Book
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Book Modal */}
      {showAddBookModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
              <h2 className="text-xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">Add New Book</h2>
              <button
                onClick={() => setShowAddBookModal(false)}
                className="p-2 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-1">
                    Title*
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C57FF]"
                    placeholder="Enter book title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-1">
                    Author*
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C57FF]"
                    placeholder="Enter author name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-1">
                    ISBN*
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C57FF]"
                    placeholder="Enter ISBN"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-1">
                    Category*
                  </label>
                  <select
                    className="w-full px-3 py-2 bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C57FF]"
                    required
                  >
                    <option value="">Select category</option>
                    {categories
                      .filter((cat) => cat !== "All")
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-1">
                    Publisher
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C57FF]"
                    placeholder="Enter publisher"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-1">
                    Publication Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C57FF]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-1">
                    Number of Copies*
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C57FF]"
                    placeholder="Enter number of copies"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-1">
                    Language
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C57FF]"
                    placeholder="Enter language"
                    defaultValue="English"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-1">
                    Location in Library
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C57FF]"
                    placeholder="Enter shelf location"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C57FF]"
                    placeholder="Enter book description"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C57FF]"
                    placeholder="E.g. Fiction, Adventure, Classic"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-1">
                    Cover Image
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-32 bg-[#F9FAFB] dark:bg-[#28243D] border border-dashed border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md flex items-center justify-center">
                      <Upload className="w-6 h-6 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        className="w-full px-3 py-2 bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C57FF]"
                        accept="image/*"
                      />
                      <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] mt-1">
                        Supported formats: JPG, PNG, GIF. Max size: 2MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
                <button
                  type="button"
                  onClick={() => setShowAddBookModal(false)}
                  className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#8C57FF] hover:bg-[#7C3AED] rounded-md transition-colors"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
