import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationEl = ({
	pagesCount,
	currentPage,
	handlePageClick,
	handlePreviousClick,
	handleNextClick,
	className,
	size,
}) => {
	return (
		<Pagination className={className} size={size}>
			<PaginationItem disabled={currentPage <= 0}>
				<PaginationLink onClick={handlePreviousClick} previous href="#" />
			</PaginationItem>
			{[...Array(pagesCount)].map((page, i) => (
				<PaginationItem active={i === currentPage} key={i}>
					<PaginationLink onClick={(e) => handlePageClick(e, i)} href="#">
						{i + 1}
					</PaginationLink>
				</PaginationItem>
			))}
			<PaginationItem disabled={currentPage >= pagesCount - 1}>
				<PaginationLink onClick={handleNextClick} next href="#" />
			</PaginationItem>
		</Pagination>
	);
};

// PaginationEl.propTypes = {
// 	pagesCount: PropTypes.number.isRequired,
// 	currentPage: PropTypes.number.isRequired,
// 	handlePageClick: PropTypes.func.isRequired,
// 	handlePreviousClick: PropTypes.func.isRequired,
// 	handleNextClick: PropTypes.func.isRequired,
// };

export default PaginationEl;
