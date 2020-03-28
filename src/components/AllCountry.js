import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography'
import Display from './Plot';


const useStyle = makeStyles((theme) => ({
    gridlayout: {
        display : 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: "stretch",
        margin: theme.spacing(2),
    },
    heading: {
        margin: theme.spacing(3),
    },
}));


function handleFlagClick(index,data,setData) {
    const url = "https://corona.lmao.ninja/v2/historical/" + data[index].country
    fetch(URL).then(response => {
        if( response.ok ) { return response }
        else { throw new Error("Something Went Worng"); }
        })
        .then( d => setData({
            "overall": data[index],
            "historic": d,}))
        .catch(error => {console.log(error);})

}

const AllCountry = (props) => {
    const classes = useStyle();
    const [data,setData] = React.useState(null);
    return(
        <div>
        {
            (data === null) ?
                <div className = {classes.gridlayout}>
                    <Typography className = {classes.heading}
                    variant = "h4"
                    color = "primary">
                        All Country
                    </Typography>
                    <GridList cols = {5} spacing = {5}>
                        {
                            props.data.map((d,index) => (
                                <GridListTile key = {d.country.flag} >
                                    <img className = {classes.button}
                                    id = {index}
                                    onClick = {(e)=>{handleFlagClick(e.target.id,props.data,setData);}}
                                    src = {d.countryInfo.flag}  />
                                    <GridListTileBar
                                        title={d.country}
                                        subtitle={<span>{d.countryInfo.iso3}</span>}
                                    />
                                </GridListTile>
                                ))
                        }
                    </GridList>
                </div> :
                <div>
                    <Display overall = {data.overall} history = {data.historic} />
                </div>

            }
            </div>
    );

}

export default AllCountry;