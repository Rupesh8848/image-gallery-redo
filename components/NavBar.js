"use client";
import { Navbar, Container, Nav } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function NavBar() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Navbar
      bg="primary"
      variant="dark"
      sticky="top"
      expand="sm"
      collapseOnSelect
    >
      <Container
        style={{
          height: "3rem",
          backgroundColor: "#0F6EFF",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 3rem",
        }}
      >
        {/* <div> */}
        <Link href={"/"}>
          <span style={{ color: "white", fontSize: "25px" }}>
            Image Gallery
          </span>
        </Link>
        {/* </div> */}

        <div>
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              gap: "3rem",
              textDecoration: "none",
            }}
          >
            <Link href={"/"}>
              <span
                style={{ color: pathname === "/" ? "white" : "powderblue" }}
              >
                Home
              </span>
            </Link>

            <Link href={"/static"}>
              <li>
                <span
                  style={{
                    color: pathname === "/static" ? "white" : "powderblue",
                  }}
                >
                  Static
                </span>
              </li>
            </Link>
            <Link href={"/dynamic"}>
              <li>
                <span
                  style={{
                    color: pathname === "/dynamic" ? "white" : "powderblue",
                  }}
                >
                  Dynamic
                </span>
              </li>
            </Link>
            <Link href={"/isr"}>
              <li>
                <span
                  style={{
                    color: pathname === "/isr" ? "white" : "powderblue",
                  }}
                >
                  ISR
                </span>
              </li>
            </Link>
            <Link href={"/search"}>
              <li>
                <span
                  style={{
                    color: pathname === "/search" ? "white" : "powderblue",
                  }}
                >
                  Search
                </span>
              </li>
            </Link>
          </ul>
        </div>
      </Container>
    </Navbar>
  );
}
