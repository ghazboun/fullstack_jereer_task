import React from 'react';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect } from 'react';
import { CardActions, Link } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';

//Expand more option if text is more than a 100 Charecters
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post(props) {
  const user = useSelector((state) => state.auth.user._id);
  // const [change, setChange] = useState(false);
  //Tracking Exapnd
  const [expanded, setExpanded] = React.useState(false);
  //Tracking Dots at the end of each post that is more than 100 Chars
  const [dots, setDots] = React.useState('...');
  const [color, setColor] = React.useState('#000');

  const [postText, setPostText] = React.useState(
    props.text.substr(0, 100) + dots
  );

  //Handling Click for expand
  const handleExpandClick = () => {
    if (expanded === false) {
      setDots('...');
      setPostText(props.text);
      setExpanded(!expanded);
    } else {
      setPostText(props.text.substr(0, 100) + dots);
      setDots('');
      setExpanded(!expanded);
    }
  };

  const getColor = async () => {
    await axios
      .get('/api/users/' + props.user)
      .then((response) => setColor(response.data.avatarcolor));
  };

  const deletePost = async () => {
    await axios
      .delete('api/posts/' + props.id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getColor();
  }, []);

  return (
    //Creating posts as cards
    <Card
      sx={{
        mb: 2,
        borderRadius: '7px',
        boxShadow: '0 10px 5px #ccc',
      }}
    >
      <CardHeader
        sx={{ textAlign: 'left' }}
        avatar={
          //Adding avatar with the first letter of each username and a randomly generated color
          <Avatar
            sx={{
              bgcolor: `${color}`,
            }}
          >
            {props.username.substr(0, 1)}
          </Avatar>
        }
        title={props.username}
        subheader={props.date}
      />
      <CardContent onClick={handleExpandClick}>
        <Typography
          sx={{ textAlign: 'left' }}
          variant="body2"
          color="text.secondary"
        >
          {props.text.length > 100 ? (
            <div>
              {' '}
              {postText}{' '}
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </div>
          ) : (
            props.text
          )}
        </Typography>
      </CardContent>
      {user === props.user ? (
        <CardActions disableSpacing>
          <IconButton
            onClick={deletePost}
            id="basic-button"
            aria-controls="settings"
            sx={{ ml: 'auto' }}
            aria-label="settings"
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      ) : (
        <div></div>
      )}
    </Card>
  );
}
