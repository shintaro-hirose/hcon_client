import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//csv export
import { CSVLink } from "react-csv";

const dnfCorrespond = {
  observationMiss: "分析ミス",
  memoSlip: "記憶飛び",
  edgeExeMiss: "エッジの実行ミス",
  cornerExeMiss: "コーナーの実行ミス",
  recallMiss: "違うレターペアの想起",
};

function CSVExportButton({ userData }) {
  const [open, setOpen] = React.useState(false);
  const results = userData.results;
  const userHandle = userData.userHandle;
  const newResults = [];
  if (results && results.length !== 0) {
    results.forEach((result) => {
      let firstTime = result.firstTime;
      let secondTime = result.secondTime;
      let thirdTime = result.thirdTime;
      let bestTime = result.bestTime;
      let firstDnfReason = result.firstDnfReason;
      let secondDnfReason = result.secondDnfReason;
      let thirdDnfReason = result.thirdDnfReason;
      let createdAt = result.createdAt;
      createdAt = new Date(createdAt);
      createdAt = createdAt.toLocaleString();
      if (firstTime === 3600) {
        firstTime = "DNF";
      }
      if (secondTime === 3600) {
        secondTime = "DNF";
      }
      if (thirdTime === 3600) {
        thirdTime = "DNF";
      }
      if (bestTime === 3600) {
        bestTime = "DNF";
      }
      if (firstDnfReason !== "") {
        firstDnfReason = dnfCorrespond[firstDnfReason];
      }
      if (secondDnfReason !== "") {
        secondDnfReason = dnfCorrespond[secondDnfReason];
      }
      if (thirdDnfReason !== "") {
        thirdDnfReason = dnfCorrespond[thirdDnfReason];
      }
      newResults.push({
        firstTime,
        secondTime,
        thirdTime,
        firstDnfReason,
        secondDnfReason,
        thirdDnfReason,
        bestTime,
        createdAt,
      });
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const headers = [
    { label: "Date", key: "createdAt" },
    { label: "Best Time", key: "bestTime" },
    { label: "First Time", key: "firstTime" },
    { label: "First DNF Reason", key: "firstDnfReason" },
    { label: "Second Time", key: "secondTime" },
    { label: "Second DNF Reason", key: "secondDnfReason" },
    { label: "Third Time", key: "thirdTime" },
    { label: "Third DNF Reason", key: "thirdDnfReason" },
  ];

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        参加履歴をCSVでエクスポート
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="csv_export-dialog-title"
        aria-describedby="csv_export-dialog-description"
      >
        <DialogTitle id="csv_export-dialog-title">
          {"CSVでエクスポート"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="csv_export-dialog-description">
            全ソルブの情報がCSVファイルに出力されます。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <CSVLink
            data={newResults ? newResults : []}
            headers={headers}
            filename={`hcon_${userHandle}_results.csv`}
          >
            <Button onClick={handleClose} color="primary" variant="contained">
              はい
            </Button>
          </CSVLink>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CSVExportButton;
