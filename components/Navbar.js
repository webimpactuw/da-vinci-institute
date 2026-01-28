import Link from "next/link";

export default function Navbar() {
	return (
		<div className="flex items-center gap-2 text-center sm:items-start sm:text-left">
            <div className="flex flex-col gap-2 text-base font-medium sm:flex-row">
                <Link
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[100px]"
                    href="/about"
                    rel="noopener noreferrer"
                >
                    about
                </Link>
                <Link
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[100px]"
                    href="/people"
                    rel="noopener noreferrer"
                >
                    people
                </Link>
                <Link
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[100px]"
                    href="/courses"
                    rel="noopener noreferrer"
                >
                    courses
                </Link>
                <Link
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[100px]"
                    href="/classwork"
                    rel="noopener noreferrer"
                >
                    classwork
                </Link>
                <Link
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[100px]"
                    href="/registration"
                    rel="noopener noreferrer"
                >
                    registration
                </Link>
                <Link
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[100px]"
                    href="/volunteer"
                    rel="noopener noreferrer"
                >
                    volunteer
                </Link>
                <Link
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[100px]"
                    href="/experience"
                    rel="noopener noreferrer"
                    >
                    experience
                </Link>
                <Link
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[100px]"
                    href="/scholarships"
                    rel="noopener noreferrer"
                    >
                    scholarships
                    </Link>
                    <Link
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[100px]"
                    href="/resources"
                    rel="noopener noreferrer"
                    >
                    resources
                    </Link>
                    <Link
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[100px]"
                    href="/organization"
                    rel="noopener noreferrer"
                    >
                    organization
                    </Link>
                    <Link
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[100px]"
                    href="/projects"
                    rel="noopener noreferrer"
                    >
                    projects
                    </Link>
                    <Link
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[100px]"
                    href="/forums"
                    rel="noopener noreferrer"
                    >
                    forums
                </Link>
                <Link
                className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[100px]"
                href="/information"
                rel="noopener noreferrer"
                >
                information
                </Link>
                <Link
                className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[100px]"
                href="/store"
                rel="noopener noreferrer"
                >
                store
                </Link>
                <Link
                className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[100px]"
                href="/assistance"
                rel="noopener noreferrer"
                >
                assistance
                </Link>
                <Link
                className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[100px]"
                href="/donations"
                rel="noopener noreferrer"
                >
                donations
                </Link>
                <Link
                className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[100px]"
                href="/connect"
                rel="noopener noreferrer"
                >
                connect
                </Link>
                < Link
                className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[100px]"
                href="/partnerships"
                rel="noopener noreferrer"
                >
                partnerships
                </Link>
            </div>
        </div>
	);
}
