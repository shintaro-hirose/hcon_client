import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    paper: {
        width:"100%",
        padding: "10px 0",
        marginTop: "20px",
        boxShadow: theme.shadows[5],
      }
}));


function Updates() {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Box paddingLeft="20px">
            <Typography variant="h6" >β版 修正</Typography>
            </Box>
            <List component="nav">
                    <div>
                    <Divider />
                    <ListItem > 
                        <ListItemText primary="スマホ・タブレットのタイマーを実装しました。Androidはどうじゃろ..." secondary="2020-2-29 13:00"/>
                    </ListItem>
                    <Divider />
                    <ListItem > 
                        <ListItemText primary="画像のリサイズを導入。プロフィール画像を更新すると、初回ロードデータが約1/300に削減されます" secondary="2020-2-27 13:00"/>
                    </ListItem>
                {/* <Divider />
                    <ListItem > 
                        <ListItemText primary="プロフィール画像や表示名の変更が過去の結果画面に及ぶようにしました" secondary="2020-2-27 13:00"/>
                    </ListItem>
                    </div>
                    <div>
                <Divider />
                    <ListItem > 
                        <ListItemText primary="今日の暫定結果を見れるようにしました" secondary="2020-2-26 22:25"/>
                    </ListItem>
                    </div>
                    <div>
                <Divider />
                    <ListItem > 
                        <ListItemText primary="ユーザページに参加履歴を追加しました" secondary="2020-2-26 17:00"/>
                    </ListItem>
                    </div>
                    <div>
                <Divider />
                    <ListItem > 
                        <ListItemText primary="参加済みの場合、参加ボタンを非表示に。レイアウト調整。" secondary="2020-2-26 01:30"/>
                    </ListItem>
                    </div>
                    <div>
                <Divider />
                    <ListItem > 
                        <ListItemText primary="結果画面の日付選択範囲を制限しました" secondary="2020-2-25 20:30"/>
                    </ListItem>
                    </div>
                    <div>
                <Divider />
                <ListItem > 
                    <ListItemText primary="タイマー機能を追加しました（スマホ未対応）" secondary="2020-2-25 8:54"/>
                </ListItem> */}
                </div>
                
            </List>
        </Paper>
    )
}

export default Updates;