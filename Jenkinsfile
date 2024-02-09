pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    git branch: "master", credentialsId: "conf-git", url: "https://github.com/conf312/issuemoa-front.git"
                }
            }
        }
        stage('Send Slack') {
            steps {
                script {
                    def commitMessage = sh(script: "git log -1 --pretty=%B", returnStdout: true).trim()
                    
                    slackSend (
                        channel: '#이슈모아', 
                        color: '#0100FF', 
                        message: "😄 이슈모아 프론트 & Push 성공! \n 💻 ${commitMessage} \n ${env.JOB_NAME},  buildNumber: [${env.BUILD_NUMBER}]"
                    )
                    
                    def emailBody = """
                    <html>
                        <body>
                            <p>💻 상세정보</p>
                            <ul>
                                <li>Commit: ${commitMessage}</li>
                                <li>Job: ${env.JOB_NAME}</li>
                                <li>Build Number: ${env.BUILD_NUMBER}</li>
                            </ul>
                        </body>
                    </html>
                    """
                    
                    def recipients = ["conf312@naver.com", "gmlrb920@naver.com"]
                    
                    emailext(
                        subject: "😄 이슈모아 프론트 & ${commitMessage}",
                        body: emailBody,
                        to: recipients.join(','),
                        mimeType: "text/html"
                    )
                }
            }
        }
    }
}
