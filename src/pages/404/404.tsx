import { Container } from "react-bootstrap";

function Page404(): JSX.Element {
    return(
        <Container className="d-flex justify-content-center align-items-center" style={{ marginTop: "100px" }}>
            <img 
                src="https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg" 
                alt="404"
                width="800px"
            />
        </Container>
    );
}

export default Page404;