<script>
export default{
    name:'AppContact',
    data(){
        return{
            contactSchema : {
                fullName:'required',
                email:'required|email',
                subject:'required',
                message:'required'
            }
        }
    }
}
</script>
<template>
    <section class="w-full pt-6">
        <div class="w-[80%] text-center m-auto">
            <h2>Contact Us</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam erat libero, bibendum in libero tempor, luctus volutpat ligula. Integer fringilla porttitor pretium.
            </p>
        </div>
        <div class="w-">
            <h3>Drop us a  message</h3>
            <div>
                <vee-form :validation-schema="contactSchema">
                    <div>
                        <!--full name-->
                        <vee-field name="fullName"
                                   v-slot="{field,errors}">
                            <input type="text"
                                v-bind="field"
                                name="fullName"
                                placeholder="fullName"
                                
                            />
                            <!--error fullname-->
                            <div v-for="error in errors"
                                 :key="error">
                                  <span class="text-red-500">{{error}}</span>
                            </div>
                        </vee-field>
                    </div>
                    <!--email-->
                    <div>
                        <vee-field v-slot="{field,errors}"
                                    name='email'>

                            <input type="text"
                                   name="email"
                                   v-bind="field"
                                />
                            <!--email error-->
                            <div v-for="error in errors"
                                 :key="error">
                                    <span>{{error}}</span>
                            </div>
                         </vee-field>

                    </div>
                    <!--subject-->
                    <div>
                        <vee-field v-slot="{field,errors}"
                                   name="subject">
                            <input type="text"
                                   name="subject"
                                   v-bind="field"
                                />
                            <!--subject Errors-->
                            <div v-for="error in errors"
                                 :key="error">
                                 
                                 <span class="text-red-500">{{error}}</span>

                            </div>
                        </vee-field>
                    </div>
                    <!--message-->
                    <div>
                     <vee-field name="message"
                                v-slot="{field,errors}">
                        <textarea name="message"
                                  v-bind="field">

                        </textarea>
                        <!--message errors-->
                        <div v-for="error in errors"
                             :key="error">
                            <span class="text-red-500">{{ error }}</span>
                        </div>
                    </vee-field>
                    </div>
                </vee-form>
            </div>
        </div>
    </section>
</template>