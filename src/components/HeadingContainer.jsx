/**
 * Stellt einen Wrapper für standardisiertes Styling der Heading Komponente zur Verfügung.
 * @param {ReactNode} children Inhalt des Titelcontainers
 * @returns {JSX.Element} HeadingContainer Komponente
 */
function HeadingContainer({children}) {
    return (
        <div className="flex flex-col md:flex-row items-center md:justify-between mx-auto mb-5 md:mb-7">
            {children}
        </div>
    )
}

export default HeadingContainer;