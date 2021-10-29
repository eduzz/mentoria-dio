import java.text.SimpleDateFormat

node {
    def app
    def dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm")
    def date = new Date()

    stage ('Clone Repository') {
        checkout scm
    }

    stage ('Set Env') {
        sh "sh ./scripts/build-set-env.sh"
    }

    stage ('Build container') {
        app = docker.build("%DOCKER-IMAGE%", "-f ./prod/Dockerfile .")
    }

     stage('Publish to DockerHub') {
         if (env.BRANCH_NAME ==~ /(develop|master)/) {
             withDockerRegistry([credentialsId: '%DOCKER-CREDENTIALS%', url: 'https://registry.hub.docker.com']) {
                 app.push("${env.BRANCH_NAME}-${env.BUILD_NUMBER}")
                 app.push("${env.BRANCH_NAME}")
             }

         }
     }
}