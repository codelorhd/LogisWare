from core.models import State

import json
import os

path =  os.path.dirname(
    os.path.dirname( os.path.abspath( __name__ ) )
    )

path = path + "/LogisWare/core/install/NIGERIA_STATES_AND_LGS.json"

with open( path ) as json_file:  
    json_data = json.load(json_file)

    for data in json_data:
        print( )
        state_name = data['state']['name']
        print( state_name )
        try:
            State.objects.get( name = state_name )
        except State.DoesNotExist:
            state_model = State()
            state_model.name = state_name
            state_model.save()

            # state_locals = data['state']['locals']
            # print("---------------")
            # for local in state_locals:
            #     local_name = local['name']
            #     if LGA.objects.filter( name = local_name ).count() == 0:
            #         print( local_name )

            #         lga = LGA()
            #         lga.name = local_name
            #         lga.save()
            #         state_model.locals.add( lga )
            #         state_model.save()