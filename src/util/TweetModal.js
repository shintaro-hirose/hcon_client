import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";

import logo from "../images/hcon-full-icon-4.svg";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import { TwitterShareButton, TwitterIcon } from "react-share";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    textAlign: "center",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  logo: {
    width: "150px",
    marginBottom: "20px",
  },
  content: {
    fontSize: "20px",
    fontFamily: "monospace",
  },
}));

function TweetModal(props) {
  const classes = useStyles();

  const contestId = props.contestId;

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.modalOpen}
        onClose={props.modalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.modalOpen}>
          <div className={classes.paper}>
            <img src={logo} alt="logo" className={classes.logo} />
            <div id="transition-modal-description">
              <Box marginTop="20px" maxWidth="500px">
                <Typography style={{ fontSize: "18px" }}>
                  {contestId.substr(0, 4)}-{contestId.substr(4, 2)}-
                  {contestId.substr(6, 4)}{" "}
                  のコンテストに参加しました。Twitterでみんなに知らせましょう！
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center" m={4}>
                <Box>
                  <Tooltip title="結果を投稿する" placement="top">
                    <TwitterShareButton
                      url="https://hcon-3bld.web.app/"
                      title={`Hcon ${contestId.substr(0, 4)}-${contestId.substr(
                        4,
                        2
                      )}-${contestId.substr(
                        6,
                        4
                      )} のコンテストに参加しました！参加締め切りは毎日24:00です。`}
                      hashtags={["Hcon", "3BLD"]}
                    >
                      <TwitterIcon size={40} round={true} />
                    </TwitterShareButton>
                  </Tooltip>
                </Box>
              </Box>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default TweetModal;
