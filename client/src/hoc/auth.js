import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authService } from '../fBase';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            onAuthStateChanged(authService, (user) => {
                if (!user) {
                    if (option) {
                        props.history.push('/login');
                    }
                } else if (option === false) {
                    props.history.push('/');
                }
            })
        }, [props.history, dispatch]);

        return <SpecificComponent />;
    }

    return AuthenticationCheck;
}
