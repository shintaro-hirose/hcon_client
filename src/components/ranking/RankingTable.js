import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Skeleton from '@material-ui/lab/Skeleton';

import { connect } from "react-redux";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
const getColorByRated = (rated) => {
  if (rated === "God Eater") {
    return "#ffcdd2";
  } else if (rated === "God") {
    return "#f8bbd0";
  } else if (rated === "Grand Master") {
    return "#e1bee7";
  } else if (rated === "Master") {
    return "#d1c4e9";
  } else if (rated === "Diamond") {
    return "#a7ffeb";
  } else if (rated === "Solomon") {
    return "#dcedc8";
  } else if (rated === "Platinum") {
    return "#b3e5fc";
  } else if (rated === "Gold") {
    return "#fff9c4";
  } else if (rated === "Silver") {
    return "#cfd8dc";
  } else if (rated === "Bronze") {
    return "#ffe0b2";
  } else if (rated === "Iron") {
    return "#f5f5f5";
  } else if (rated === "beginner") {
    return "#d7ccc8";
  } else {
    return "#d7ccc8";
  }
};
const headCells = [
  { id: "rank", numeric: false, disablePadding: true, label: "順位" },
  { id: "userHandle", numeric: false, disablePadding: true, label: "ユーザ名" },
  { id: "rating", numeric: true, disablePadding: false, label: "レート" },
  { id: "time", numeric: true, disablePadding: false, label: "単発" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding="none"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {},
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  return (
    <div>
      <Toolbar>
        <Typography className={classes.title} variant="h6" id="tableTitle">
          全体ランキング
        </Typography>
      </Toolbar>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    boxShadow: theme.shadows[5],
  },
  table: {
    padding: 0,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  profileImage: {
    width: 25,
    height: 25,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
    display: "inline",
    verticalAlign: "middle",
  },
  imgBox: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "30%",
    },
    display: "inline",
  },
  tablecell:{
    textTransform: "none",
    color:"#000"
  }
}));

function RankingTable(props) {
  const classes = useStyles();
  const userSummaries = props.user.userSummaries;
  const rows = [];
  const skeletonRows = Array(10);
  skeletonRows.fill(0);
  userSummaries.forEach((userSummary, index) => {
    rows.push({
      rank: index + 1,
      displayName: userSummary.displayName,
      userHandle: userSummary.userHandle,
      rating: Number(userSummary.rating),
      time: userSummary.bestTime1.time,
      imageUrl: userSummary.imageUrl,
      rated: userSummary.rated,
    });
  });
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("rating");
  const [page, setPage] = React.useState(0);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            className={classes.table}
            size="small"
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows.length ? (
              stableSort(rows, getComparator(order, orderBy))
                .slice(page * 10, page * 10 + 10)
                .map((row, index) => {
                  return (
                    <TableRow
                      key={row.userHandle}
                      style={{ backgroundColor: getColorByRated(row.rated)}}
                      >
                      <TableCell align="center" padding="none" className={classes.tablecell}>
                        {row.rank}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="left"
                      >
                        <Box className={classes.imgBox}>
                          <img
                            src={row.imageUrl}
                            alt="profile"
                            className={classes.profileImage}
                          />
                        </Box>
                        <Button
                          component={Link}
                          to={`/user/${row.userHandle}`}
                          className={classes.tablecell}
                        >
                          {row.displayName}
                        </Button>
                      </TableCell>

                      <TableCell align="center" padding="none" className={classes.tablecell}>
                        {row.rating}
                      </TableCell>
                      <TableCell align="center" padding="none" className={classes.tablecell}>
                        {row.time === 3600
                          ? "-"
                          : row.time >= 60
                          ? `${Math.floor(row.time / 60)}:${(
                              "0" +
                              String(
                                (
                                  row.time -
                                  60 * Math.floor(row.time / 60)
                                ).toFixed(2)
                              )
                            ).substr(-5)}`
                          : row.time.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })) : (
                  skeletonRows.map((row, index) => {
                    return(
                      <TableRow
                      key={index}
                      height={37.5}
                      >
                      <TableCell >
                       <Skeleton variant="rectangular"/>
                      </TableCell>
                      <TableCell >
                       <Skeleton variant="rectangular"/>
                      </TableCell>
                      <TableCell >
                       <Skeleton variant="rectangular"/>
                      </TableCell>
                      <TableCell >
                       <Skeleton variant="rectangular"/>
                      </TableCell>
                    </TableRow>
                    )
                  })
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={10}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPageOptions={[10]}
        />
      </Paper>
    </div>
  );
}

RankingTable.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(RankingTable);
