// import React from 'react';
// import {Query} from 'react-apollo';
// import gql from 'graphql-tag';

// const Players = () => (
//     <Query query={gql`
//         {
//             YOLO{
//                 label
//                 topleft{
//                     x
//                     y
//                 }
//             }
//         }
//     `}>
//         {({loading, error, data}) => {
//             if (loading) return <p>Loading ...</p>;
//             if (error) return <p>Error :(</p>;
//             console.log(data);
//             return data.YOLO.map(({label, confidence}) => (
//                 <div key={confidence}>
//                     <p>{label}</p>
//                 </div>
//             ))
//         }}
//     </Query>
// );
// export default Players;