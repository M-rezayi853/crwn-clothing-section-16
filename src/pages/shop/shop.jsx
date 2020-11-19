import React, { useEffect, useRef } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview';
import CollectionPage from '../collection/collection';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions.js';


const Shop = ({ match, updateCollections }) => {

    let unsubscribeFormSnapshot = useRef(null);

    useEffect(() => {
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
        });
    }, [updateCollections]);

    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`} component={CollectionsOverview} />
            <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap))
});


export default connect(null ,mapDispatchToProps)(Shop);