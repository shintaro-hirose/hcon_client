import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    marginBottom: "20px",
  },
  content: {
    marginBottom: "30px",
  },
}));

export default function PrivacyPolicy() {
  const classes = useStyles();

  return (
    <div>
      <Typography component="div">
        <Box fontWeight="bold" fontSize="h4.fontSize">
          プライバシーポリシー
        </Box>
        <Box textAlign="right" marginBottom="20px">
          2020年3月3日　制定・施行
        </Box>
        <Box className={classes.content}>
          当サイト管理者（以下，「管理者」といいます。）は，本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）における，ユーザーの個人データの取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
          ユーザー登録をしたことで本規約の全ての条項に同意したものとみなします。
        </Box>
        <Box className={classes.title}>第1条（個人データ）</Box>
        <Box className={classes.content}>
          「個人データ」とは，ユーザID，表示名，メールアドレス，所属団体，TwitterID，大会の参加日時，試技のタイムを指します。
        </Box>
        <Box className={classes.title}>第2条（個人データの収集方法）</Box>
        <Box className={classes.content}>
          管理者は，ユーザーが利用登録をする際にメールアドレスを収集することがあります。また、コンテストに参加したときに大会の参加日時，試技のタイム、DNFの原因を収集することがあります。
        </Box>
        <Box className={classes.title}>
          第3条（個人データを収集・利用する目的）
        </Box>
        <Box className={classes.content}>
          管理者が個人データを収集・利用する目的は，以下のとおりです。
          <br />
          <br />
          ・本サービスの提供・運営のため
          <br />
          ・ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）
          <br />
          ・メンテナンス，重要なお知らせなど必要に応じたご連絡のため
          <br />
          ・利用規約に違反したユーザーや，不正・不当な目的でサービスを利用しようとするユーザーの特定をし，ご利用をお断りするため
          <br />
          ・ユーザーにご自身の登録情報の閲覧や変更，削除，ご利用状況の閲覧を行っていただくため
          <br />
          ・上記の利用目的に付随する目的
          <br />
        </Box>
        <Box className={classes.title}>第4条（利用目的の変更）</Box>
        <Box className={classes.content}>
          1.
          管理者は，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。
          <br />
          2.
          利用目的の変更を行った場合には，変更後の目的について，管理者所定の方法により，ユーザーに通知し，または本ウェブサイト上に公表するものとします。
        </Box>
        <Box className={classes.title}>第5条（個人データの第三者提供）</Box>
        <Box className={classes.content}>
          1.
          管理者は，次に掲げる場合を除いて，あらかじめユーザーの同意を得ることなく，第三者に個人データを提供することはありません。ただし，個人情報保護法その他の法令で認められる場合を除きます。
          <br />
          ・人の生命，身体または財産の保護のために必要がある場合であって，本人の同意を得ることが困難であるとき
          <br />
          ・国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって，本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
          <br />
          2.前項の定めにかかわらず，次に掲げる場合には，当該情報の提供先は第三者に該当しないものとします。
          <br />
          ・管理者が利用目的の達成に必要な範囲内において個人データの取扱いの全部または一部を委託する場合
          <br />
          ・個人データを特定の者との間で共同して利用する場合であって，その旨並びに共同して利用される個人情報の項目，共同して利用する者の範囲，利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について，あらかじめ本人に通知し，または本人が容易に知り得る状態に置いた場合
        </Box>
        <Box className={classes.title}>第6条（個人データの開示）</Box>
        <Box className={classes.content}>
          1.
          管理者は，本人から個人データの開示を求められたときは，本人に対し，遅滞なくこれを開示します。ただし，開示することにより次のいずれかに該当する場合は，その全部または一部を開示しないこともあり，開示しない決定をした場合には，その旨を遅滞なく通知します。
          <br />
          ・本人または第三者の生命，身体，財産その他の権利利益を害するおそれがある場合
          <br />
          ・管理者の業務の適正な実施に著しい支障を及ぼすおそれがある場合
          <br />
          ・その他法令に違反することとなる場合
        </Box>
        <Box className={classes.title}>第7条（個人情報の利用停止等）</Box>
        <Box className={classes.content}>
          1.
          管理者は，本人から，個人データが，利用目的の範囲を超えて取り扱われているという理由，または不正の手段により取得されたものであるという理由により，その利用の停止または消去（以下，「利用停止等」といいます。）を求められた場合には，遅滞なく必要な調査を行います。
          <br />
          2.
          前項の調査結果に基づき，その請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の利用停止等を行います。
          <br />
          3.
          管理者は，前項の規定に基づき利用停止等を行った場合，または利用停止等を行わない旨の決定をしたときは，遅滞なく，これをユーザーに通知します。
          <br />
          4.
          前2項にかかわらず，利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって，ユーザーの権利利益を保護するために必要なこれに代わるべき措置をとれる場合は，この代替策を講じるものとします。
          <br />
        </Box>
        <Box className={classes.title}>第8条（プライバシーポリシーの変更）</Box>
        <Box className={classes.content}>
          1.
          本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。
          <br />
          2.
          管理者が別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。
        </Box>
        <Box textAlign="right">以上</Box>
      </Typography>
    </div>
  );
}
