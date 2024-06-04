import { format } from "date-fns";

/* -------------------------------------------------------------------------- */
/*                                    USER                                    */
/* -------------------------------------------------------------------------- */

export const getUsers = async () => {
    try {
        const response = await fetch('api/GET/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        return {
            status: data.status,
            message: data.message,
            body: data.body
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error (getUsers)',
            error: error
        }
    }
}

export const getUserById = async (userId: string | undefined) => {
    try {
        const response = await fetch(`api/GET/users/userId/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        return {
            status: data.status,
            message: data.message,
            body: data.body
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error (getUserById)',
            error: error
        }
    }
}

export const getUserByEmail = async (email: string | undefined) => {
    try {
        const response = await fetch(`api/GET/users/userEmail/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        return {
            status: data.status,
            message: data.message,
            body: data.body
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error (getUserByEmail)',
            error: error
        }
    }
}

export const getLast5SubmittedForms = async () => {
    try {
        const response = await fetch('api/GET/formResponse', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        const users = data.body.sort((a: any, b: any) => {
            return b.userId - a.userId;
        }).filter((user: any, index: number, array: any) => {
            return index === array.findIndex((t: any) => (
                t.userId === user.userId
            ))
        }).slice(0, 5);

        const usersInfo = users.map(async (user: any) => {
            const userId = user.userId;
            const userInfo = await getUserById(userId)
            return {
                id: userInfo.body.id,
                email: userInfo.body.email,
                nom: userInfo.body.nom,
                prenom: userInfo.body.prenom,
            }
        })

        const usersInfoResolved = await Promise.all(usersInfo);
        return {
            status: 'success',
            message: 'Last 5 user who as submitted forms',
            body: usersInfoResolved
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error (getLast5SubmittedForms)',
            error: error
        }
    }
}

export const checkIfUserExistsByEmail = async (email: string | undefined) => {
    try {
        const response = await fetch(`api/GET/users/userEmail/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        if (data.message === 'User found') {
            return true;
        }
        return false;
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error (checkIfUserExists)',
            error: error
        }
    }
}

export const createUser = async (data: any) => {
    try {
        const payload = {
            InformationPersonnelles: {
                email: data.InformationPersonnelles.email,
                nom: data.InformationPersonnelles.nom,
                prenom: data.InformationPersonnelles.prenom,
                phone: data.InformationPersonnelles.phone,
                birthdate: data.InformationPersonnelles.birthdate,
                job: data.InformationPersonnelles.job,
            }
        }
        const response = await fetch('api/POST/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const dataResponse = await response.json();
        return {
            status: 'success',
            message: 'User created',
            body: dataResponse
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error (createUser)',
            error: error
        }
    }
}

/* -------------------------------------------------------------------------- */
/*                                 FormReponse                                */
/* -------------------------------------------------------------------------- */

export const getFormResponses = async () => {
    try {
        const response = await fetch('api/GET/formResponses', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        return {
            status: data.status,
            message: data.message,
            body: data.body
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error (getFormResponses)',
            error: error
        }
    }
}

export const getFormResponseByUserId = async (userId: string | undefined) => {
    try {
        const response = await fetch(`api/GET/formResponse/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        return {
            status: data.status,
            message: data.message,
            body: data.body
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error (getFormResponseByUserId)',
            error: error
        }
    }
}


type DataPayload = {
    userId: string;
}

export const associateResponseToUser = async (data: DataPayload) => {
    try {
        const payload = {
            userId: data.userId,
        }

        const response = await fetch('api/POST/associateResponseToUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const dataResponse = await response.json();
        return {
            status: 'success',
            message: 'UserId associated to formResponse',
            body: dataResponse
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error (associateResponseToUser)',
            error: error
        }
    }
}


/* -------------------------------------------------------------------------- */
/*                                   Answers                                  */
/* -------------------------------------------------------------------------- */

export const createAnswers = async (data: any) => {
    const payload = {
        formResponseId: data.formResponseId,
        HorairesDeTravail: data.HorairesDeTravail,
        EffortMental: data.LEffortMental,
        EffortPhysique: data.LEffortPhysique,
        Environnement: data.LEnvironnement,
        SatisfactionEtEvolutionDeCarriere: data.SatisfactionEtEvolutionDeCarriere,
    };

    try {
        const response = await fetch('api/POST/createAnswers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const dataResponse = await response.json();
        return {
            status: 'success',
            message: 'Answers created',
            body: dataResponse
        };
    } catch (error) {
        console.error('Error creating answers', error);
        return {
            status: 'error',
            message: 'Internal server error',
            error: error
        };
    }
}

export const getAnswers = async (responceFormId: string) => {
    try {
        const response = await fetch(`api/GET/answers/${responceFormId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        return {
            status: data.status,
            message: data.message,
            body: data.body
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error (checkIfUserExists)',
            error: error
        }
    }
}


/* -------------------------------------------------------------------------- */
/*                                  Priority                                  */
/* -------------------------------------------------------------------------- */

export const createPriority = async (data: any) => {
    try {
        const payload = {
            formResponseId: data.formResponseId,
            value: data.value,
            label: data.label,
        }

        const response = await fetch('api/POST/createPriority', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const dataResponse = await response.json();
        return {
            status: 'success',
            message: 'Answers created',
            body: {
                priority: dataResponse,
            }
        };
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error (createPriority)',
            error: error
        }
    }
}

export const getPriorityByFormResponseId = async (formResponseId: string) => {
    try {
        const response = await fetch(`api/GET/priority/${formResponseId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        return {
            status: data.status,
            message: data.message,
            body: data.body
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error (getPriorityByFormResponseId)',
            error: error
        }
    }
}


/* -------------------------------------------------------------------------- */
/*                               DATE PICK RAGE                               */
/* -------------------------------------------------------------------------- */

export const getDatePickRange = async (date: any) => {
    try {
        const playload = {
            startDate: format(date.from, "yyyy-MM-dd"),
            endDate: format(date.to, "yyyy-MM-dd"),
        };
        const response = await fetch('api/POST/createCsvFileWithAllData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playload)
        });
        const data = await response.json();
        return {
            status: data.status,
            message: data.message,
            body: data.body
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error (getDatePickRange)',
            error: error
        }
    }
}


/* --------------------------------- MAILEUR -------------------------------- */

export const sendEmail = async (data: any) => {
    try {
        const payload = {
            username: data.username,
            invitedByUsername: data.invitedByUsername,
        }

        const response = await fetch('api/mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const dataResponse = await response.json();
        return {
            status: 'success',
            message: 'Email sent',
            body: dataResponse
        };
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error (sendEmail)',
            error: error
        }
    }
}
